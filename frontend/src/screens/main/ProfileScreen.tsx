import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from '@apollo/client';
import { useTheme } from '../../theme/ThemeContext';
import { GET_USER_POSTS } from '../../graphql/posts/userPosts.query';
import { CREATE_POST } from '../../graphql/posts/createPost.mutation';
import { DELETE_ALL_POSTS } from '../../graphql/posts/deleteAllPosts.mutation';
import { DELETE_ALL_CHATS } from '../../graphql/chat/deleteAllChats.mutation';
import { DELETE_ALL_MESSAGES } from '../../graphql/chat/deleteAllMessages.mutation';
import { GET_FOLLOW_COUNTS } from '../../graphql/follows/counts.query';
import { notifyTokenChange } from '../../screens/auth/LoginScreen';
import { refetchHomeFeed } from './HomeScreen';
import { styles } from '../../styles/main/ProfileScreen.styles';

type UserData = {
  _id: string;
  username: string;
  email: string;
};

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [localPosts, setLocalPosts] = useState<{ id: string; uri: string; caption: string }[]>([]);
  const [pendingUri, setPendingUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profileImage, setProfileImage] = useState<string>('');

  useEffect(() => {
    console.log('[POST] showPreview changed to:', showPreview);
  }, [showPreview]);

  useEffect(() => {
    console.log('[POST] pendingUri changed to:', pendingUri);
  }, [pendingUri]);

  useEffect(() => {
    loadUserData();
  }, []);

  const { data: postsData } = useQuery(GET_USER_POSTS, {
    variables: { userId: userData?._id || 'user_default' },
    skip: !userData,
  });

  const { data: countsData } = useQuery(GET_FOLLOW_COUNTS, {
    variables: { userId: userData?._id || 'user_default' },
    skip: !userData,
  });

  const [createPost] = useMutation(CREATE_POST);
  const [deleteAllPosts] = useMutation(DELETE_ALL_POSTS);
  const [deleteAllChats] = useMutation(DELETE_ALL_CHATS);
  const [deleteAllMessages] = useMutation(DELETE_ALL_MESSAGES);

  async function loadUserData() {
    try {
      const stored = await AsyncStorage.getItem('user_data');
      if (stored) {
        const user = JSON.parse(stored);
        setUserData(user);
        
        setProfileImage(`https://dummyjson.com/icon/${user.username}/128`);
      }
    } catch (e) {
      console.log('Error loading user data:', e);
    }
  }

  const backendPosts = (postsData?.getUserPosts ?? []).map((p: any) => ({
    id: p._id,
    uri: p.mediaUrl,
    caption: p.caption || '',
  }));

  const allPosts = [...localPosts, ...backendPosts];

  const followersCount = countsData?.getFollowersCount ?? 0;
  const followingCount = countsData?.getFollowingCount ?? 0;

  function handleAddPost() {
    console.log('[POST] +Post button pressed - loading dummy image');
    const dummyImageUrl = `https://picsum.photos/400/400?random=${Date.now()}`;
    setPendingUri(dummyImageUrl);
    setCaption('');
    setShowPreview(true);
  }

  async function handleCreatePost() {
    if (!pendingUri || !userData) return;
    
    console.log('[POST] creating post', { uri: pendingUri, caption });
    
    setLocalPosts(prev => [{
      id: Date.now().toString(),
      uri: pendingUri,
      caption: caption,
    }, ...prev]);
    
    setShowPreview(false);
    setPendingUri(null);
    setCaption('');
    
    try {
      await createPost({ 
        variables: { 
          input: { 
            username: userData.username,
            mediaUrl: pendingUri, 
            type: 'image', 
            caption 
          } 
        } 
      });
      console.log('[POST] saved to DB');
      
      refetchHomeFeed();
    } catch (e) {
      console.log('backend post error', e);
    }
  }

  function handleCancelPreview() {
    setShowPreview(false);
    setPendingUri(null);
    setCaption('');
  }

  async function handleDeleteAllPosts() {
    try {
      await deleteAllPosts();
      setLocalPosts([]);
      refetchHomeFeed();
      console.log('[DEBUG] All posts deleted');
    } catch (e) {
      console.log('Delete error:', e);
    }
  }

  async function handleResetAll() {
    try {
      console.log('[DEBUG] Resetting all data...');
      await deleteAllPosts();
      await deleteAllChats();
      await deleteAllMessages();
      setLocalPosts([]);
      refetchHomeFeed();
      console.log('[DEBUG] All data deleted - posts, chats, messages');
      console.log('[SUCCESS] All data cleared! App reset to fresh state.');
    } catch (e: any) {
      console.log('Reset error:', e);
      console.log('[ERROR] Error resetting data:', e.message);
    }
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_data');
    notifyTokenChange();
  }

  function renderGridItem({ item }: { item: { id: string; uri: string; caption: string } }) {
    return (
      <Image 
        source={{ uri: item.uri }} 
        style={{ width: '33.33%', aspectRatio: 1 }}
        resizeMode="cover"
      />
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading...</Text>
      </View>
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
        style={{ flex: 1 }}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              {profileImage ? (
                <Image 
                  source={{ uri: profileImage }} 
                  style={styles.avatar}
                />
              ) : (
                <View style={[styles.avatar, { backgroundColor: theme.inputBackground }]} />
              )}

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
              <Text style={[styles.username, { color: theme.text }]}>{userData.username}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity 
                  style={[styles.themeBtn, { backgroundColor: theme.inputBackground }]} 
                  onPress={toggleTheme}
                >
                  <Text style={styles.themeBtnText}>{isDark ? '☀️' : '🌙'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.postButton, { backgroundColor: theme.primary }]} 
                  onPress={handleAddPost}
                >
                  <Text style={styles.postButtonText}>+ Post</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.logoutButton, { backgroundColor: theme.inputBackground }]} 
                  onPress={handleLogout}
                >
                  <Text style={[styles.logoutButtonText, { color: theme.text }]}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.logoutButton, { backgroundColor: 'red', marginLeft: 5 }]} 
                  onPress={handleResetAll}
                >
                  <Text style={[styles.logoutButtonText, { color: 'white' }]}>Reset All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />

      <Modal
        visible={showPreview}
        animationType="slide"
        onRequestClose={handleCancelPreview}
      >
        <View style={{ flex: 1, backgroundColor: theme.background }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            {pendingUri && (
              <Image 
                source={{ uri: pendingUri }} 
                style={{ width: '100%', height: 300, marginBottom: 20 }}
                resizeMode="contain"
              />
            )}
            
            <TextInput
              value={caption}
              onChangeText={setCaption}
              placeholder="Write a caption..."
              placeholderTextColor={theme.text + '80'}
              style={{
                width: '100%',
                height: 100,
                borderWidth: 1,
                borderColor: theme.inputBorder,
                backgroundColor: theme.inputBackground,
                color: theme.text,
                padding: 15,
                borderRadius: 8,
                textAlignVertical: 'top',
                marginBottom: 20,
              }}
              multiline
            />
            
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <TouchableOpacity 
                style={{
                  backgroundColor: theme.inputBackground,
                  paddingHorizontal: 30,
                  paddingVertical: 15,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme.inputBorder,
                }}
                onPress={handleCancelPreview}
              >
                <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{
                  backgroundColor: theme.primary,
                  paddingHorizontal: 30,
                  paddingVertical: 15,
                  borderRadius: 8,
                }}
                onPress={handleCreatePost}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
