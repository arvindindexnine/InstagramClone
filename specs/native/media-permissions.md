# Feature: Native Media Access (Android — Kotlin Bridge)

## Goal

Replace mock media selection with real Android functionality:

- open gallery and pick image/video
- open camera and capture media
- return selected media URI to React Native

Keep implementation minimal and direct.

---

## Scope

This includes:

- Android permissions (camera + media)
- Kotlin native module
- React Native bridge functions
- replacing mock media selection in ProfileScreen

This does NOT include:

- uploading media to backend
- file processing or compression
- advanced permission handling
- iOS support

---

## Permissions

Add to AndroidManifest.xml:

- CAMERA
- READ_MEDIA_IMAGES (API 33+)
- READ_EXTERNAL_STORAGE (fallback for lower SDK)

Do not over-handle edge cases.

---

## Native Module

Create Kotlin module:

Location:

android/app/src/main/java/.../MediaModule.kt

---

## Exposed Methods

Expose two functions:

- openGallery()
- openCamera()

---

## Behavior

### openGallery()

- request permission if needed
- launch gallery intent:

Intent(Intent.ACTION_PICK)

- allow image selection (video optional)
- return URI string

---

### openCamera()

- request CAMERA permission
- launch camera:

Intent(MediaStore.ACTION_IMAGE_CAPTURE)

- return captured media URI

---

## Result Handling

Use Activity result handling.

After selection/capture:

- extract URI
- send back to React Native

---

## React Native Bridge

Expose module:

NativeModules.MediaModule

---

## Expected JS Usage

In ProfileScreen:

Replace mock logic:

- call openGallery()
- call openCamera()

Receive:

- URI string

Then:

- add to localPosts

---

## Local Post Structure Update

Update localPosts to store:

- id
- uri

Instead of imageUrl.

---

## Rendering Update

Use:

<Image source={{ uri: item.uri }} />

No transformation needed.

---

## Error Handling

Minimal:

- if permission denied → do nothing or log
- if user cancels → ignore

Do not build UI error system.

---

## Code Expectations

- straightforward Kotlin code
- minimal bridging logic
- no abstraction layers
- no helper classes

---

## Comments

Minimal only.

---

## Do NOT

- do not implement upload
- do not store files permanently
- do not build permission manager
- do not support iOS
- do not over-engineer module structure

---

## Developer Notes

This replaces only the media source.

All UI and state logic from 2C remains unchanged.

Focus on:

- working flow
- correct URI handling
- simple integration