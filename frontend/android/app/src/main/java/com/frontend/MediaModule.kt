package com.frontend

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.provider.MediaStore
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import java.io.File

class MediaModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var pendingPromise: Promise? = null
    private var cameraImageUri: Uri? = null

    companion object {
        private const val GALLERY_REQUEST = 1001
        private const val CAMERA_REQUEST = 1002
    }

    override fun getName() = "MediaModule"

    @ReactMethod
    fun openGallery(promise: Promise) {
        val activity = reactContext.currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "No activity")
            return
        }

        val permission = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU)
            Manifest.permission.READ_MEDIA_IMAGES
        else
            Manifest.permission.READ_EXTERNAL_STORAGE

        if (ContextCompat.checkSelfPermission(activity, permission) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(activity, arrayOf(permission), GALLERY_REQUEST)
            promise.reject("PERMISSION_DENIED", "Storage permission denied")
            return
        }

        pendingPromise = promise
        val intent = Intent(Intent.ACTION_PICK).apply {
            type = "image/*"
        }
        activity.startActivityForResult(intent, GALLERY_REQUEST)
    }

    @ReactMethod
    fun openCamera(promise: Promise) {
        val activity = reactContext.currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "No activity")
            return
        }

        if (ContextCompat.checkSelfPermission(activity, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(activity, arrayOf(Manifest.permission.CAMERA), CAMERA_REQUEST)
            promise.reject("PERMISSION_DENIED", "Camera permission denied")
            return
        }

        val imageFile = File(reactContext.cacheDir, "camera_${System.currentTimeMillis()}.jpg")
        cameraImageUri = FileProvider.getUriForFile(
            reactContext,
            "${reactContext.packageName}.provider",
            imageFile
        )

        pendingPromise = promise
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE).apply {
            putExtra(MediaStore.EXTRA_OUTPUT, cameraImageUri)
        }
        activity.startActivityForResult(intent, CAMERA_REQUEST)
    }

    fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (resultCode != Activity.RESULT_OK) {
            pendingPromise?.reject("CANCELLED", "User cancelled")
            pendingPromise = null
            return
        }

        when (requestCode) {
            GALLERY_REQUEST -> {
                val uri = data?.data?.toString()
                if (uri != null) pendingPromise?.resolve(uri)
                else pendingPromise?.reject("NO_URI", "No image selected")
            }
            CAMERA_REQUEST -> {
                val uri = cameraImageUri?.toString()
                if (uri != null) pendingPromise?.resolve(uri)
                else pendingPromise?.reject("NO_URI", "Camera capture failed")
            }
        }
        pendingPromise = null
    }
}
