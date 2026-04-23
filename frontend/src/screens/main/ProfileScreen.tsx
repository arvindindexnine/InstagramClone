import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  NativeModules,
  Dimensions,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/ThemeContext';
import { GET_USER_POSTS } from '../../graphql/posts/userPosts.query';
import { CREATE_POST } from '../../graphql/posts/createPost.mutation';
import { GET_FOLLOW_COUNTS } from '../../graphql/follows/counts.query';
import { notifyTokenChange } from '../../screens/auth/LoginScreen';
import { styles } from '../../styles/main/ProfileScreen.styles';

const { MediaModule } = NativeModules;

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_SIZE = SCREEN_WIDTH / 3;

const TEMP_USER_ID = 'user_default';

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [localPosts, setLocalPosts] = useState<{ id: string; uri: string }[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const { data: postsData } = useQuery(GET_USER_POSTS, {
    variables: { userId: TEMP_USER_ID },
  });

  const { data: countsData } = useQuery(GET_FOLLOW_COUNTS, {
    variables: { userId: TEMP_USER_ID },
  });

  const [createPost] = useMutation(CREATE_POST);

  const backendPosts = (postsData?.getUserPosts ?? []).map((p: any) => ({
    id: p._id,
    uri: p.mediaUrl,
  }));

  const allPosts = [...localPosts, ...backendPosts];

  const followersCount = countsData?.getFollowersCount ?? 0;
  const followingCount = countsData?.getFollowingCount ?? 0;

  async function handleGallery() {
    setShowOptions(false);
    try {
      const uri = await MediaModule.openGallery();
      setLocalPosts(prev => [{ id: Date.now().toString(), uri }, ...prev]);
      createPost({ variables: { input: { mediaUrl: uri, type: 'image' } } });
    } catch (e) {
      console.log('gallery error', e);
    }
  }

  async function handleCamera() {
    setShowOptions(false);
    try {
      const uri = await MediaModule.openCamera();
      setLocalPosts(prev => [{ id: Date.now().toString(), uri }, ...prev]);
      createPost({ variables: { input: { mediaUrl: uri, type: 'image' } } });
    } catch (e) {
      console.log('camera error', e);
    }
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('auth_token');
    notifyTokenChange();
  }

  function renderGridItem({ item }: { item: { id: string; uri: string } }) {
    return (
      <Image source={{ uri: item.uri }} style={styles.gridItem} />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={allPosts}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={renderGridItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View style={[styles.avatar, { backgroundColor: theme.inputBackground }]} />

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: theme.text }]}>{allPosts.length}</Text>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Posts</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: theme.text }]}>{followersCount}</Text>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: theme.text }]}>{followingCount}</Text>
                  <Text style={[styles.statLabel, { color: theme.text }]}>Following</Text>
                </View>
              </View>
            </View>

            <View style={styles.usernameRow}>
              <Text style={[styles.username, { color: theme.text }]}>arvind_dev</Text>
              <View style={styles.buttons}>
                <TouchableOpacity 
                  style={[styles.themeBtn, { backgroundColor: theme.inputBackground }]} 
                  onPress={toggleTheme}
                >
                  <Text style={styles.themeBtnText}>{isDark ? '☀️' : '🌙'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.postButton, { backgroundColor: theme.primary }]} 
                  onPress={() => setShowOptions(true)}
                >
                  <Text style={styles.postButtonText}>+ Post</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6, backgroundColor: theme.inputBackground }]} 
                  onPress={handleLogout}
                >
                  <Text style={[{ fontSize: 13, fontWeight: '600', color: theme.text }]}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />

      <Modal
        visible={showOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptions(false)}
        >
          <View style={[styles.modalSheet, { backgroundColor: theme.inputBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Add Post</Text>

            <TouchableOpacity 
              style={[styles.modalOption, { borderTopColor: theme.inputBorder }]} 
              onPress={handleGallery}
            >
              <Text style={[styles.modalOptionText, { color: theme.text }]}>Upload from gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modalOption, { borderTopColor: theme.inputBorder }]} 
              onPress={handleCamera}
            >
              <Text style={[styles.modalOptionText, { color: theme.text }]}>Use camera</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modalCancel, { borderTopColor: theme.inputBorder }]} 
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
