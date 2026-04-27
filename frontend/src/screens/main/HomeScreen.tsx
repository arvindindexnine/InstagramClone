import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { useTheme } from '../../theme/ThemeContext';
import { GET_FEED } from '../../graphql/posts/getFeed.query';
import { fetchUsers } from '../../services/api';
import { styles } from '../../styles/main/HomeScreen.styles';

let globalRefetchFeed: (() => void) | null = null;

export default function HomeScreen() {
  const { theme } = useTheme();
  const [users, setUsers] = useState<any[]>([]);
  
  const { data: feedData, loading, error, refetch } = useQuery(GET_FEED);
  const userPosts = feedData?.getFeed || [];

  useEffect(() => {
    globalRefetchFeed = refetch;
  }, [refetch]);

  const dummyPosts = [
    {
      _id: 'dummy_1',
      userId: 'alice_id',
      username: 'alice_wonder',
      mediaUrl: 'https://picsum.photos/400/400?random=1',
      caption: 'Beautiful sunset today!',
      type: 'image',
      createdAt: new Date(Date.now() - 1000 * 60 * 60)
    },
    {
      _id: 'dummy_2',
      userId: 'bob_id',
      username: 'bob_builder',
      mediaUrl: 'https://picsum.photos/400/400?random=2',
      caption: 'Coffee time ☕',
      type: 'image',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      _id: 'dummy_3',
      userId: 'charlie_id',
      username: 'charlie_brown',
      mediaUrl: 'https://picsum.photos/400/400?random=3',
      caption: 'Weekend vibes 🌟',
      type: 'image',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3)
    },
    {
      _id: 'dummy_4',
      userId: 'diana_id',
      username: 'diana_prince',
      mediaUrl: 'https://picsum.photos/400/400?random=4',
      caption: 'Nature is amazing 🌿',
      type: 'image',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4)
    },
    {
      _id: 'dummy_5',
      userId: 'edward_id',
      username: 'edward_stark',
      mediaUrl: 'https://picsum.photos/400/400?random=5',
      caption: 'Good morning everyone!',
      type: 'image',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5)
    }
  ];

  const combinedPosts = [...userPosts, ...dummyPosts];

  useEffect(() => {
    console.log('HomeScreen mounted');
    loadUsers();
  }, []);

  useEffect(() => {
    console.log('Feed data changed:', feedData);
    console.log('User posts count:', userPosts.length);
    console.log('Combined posts count:', combinedPosts.length);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [feedData, userPosts, combinedPosts, loading, error]);

  async function loadUsers() {
    try {
      console.log('Loading users from API');
      const usersData = await fetchUsers();
      console.log('Users loaded:', usersData.length);
      setUsers(usersData.slice(0, 10));
    } catch (error) {
      console.log('Error loading users:', error);
    }
  }

  function renderStory({ item }: any) {
    return (
      <TouchableOpacity style={styles.storyItem}>
        <Image source={{ uri: item.image }} style={styles.storyAvatar} />
        <Text style={[styles.storyUsername, { color: theme.text }]}>{item.username}</Text>
      </TouchableOpacity>
    );
  }

  function renderPost({ item }: any) {
    console.log('Rendering post:', item._id, 'by user:', item.username);
    const imageUrl = item.mediaUrl;
    const username = item.username;
    
    return (
      <View style={[styles.postCard, { backgroundColor: theme.background }]}>
        <View style={styles.postHeader}>
          <Image 
            source={{ uri: `https://dummyjson.com/icon/${username}/40` }} 
            style={styles.postAvatar} 
          />
          <Text style={[styles.postUsername, { color: theme.text }]}>{username}</Text>
        </View>

        <Image source={{ uri: imageUrl }} style={styles.postImage} />

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={[styles.actionIcon, { color: theme.text }]}>♡</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={[styles.actionIcon, { color: theme.text }]}>💬</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.likesText, { color: theme.text }]}>0 likes</Text>

        <Text style={[styles.caption, { color: theme.text }]}>
          <Text style={[styles.postUsername, { color: theme.text }]}>{username} </Text>
          {item.caption || 'New post'}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.inputBorder }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Instagram</Text>
      </View>

      {loading ? (
        <Text style={[styles.loadingText, { color: theme.textMuted }]}>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={renderStory}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.storiesContainer, { borderBottomColor: theme.inputBorder }]}
          />
          
          <FlatList
            data={combinedPosts}
            keyExtractor={item => item._id}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

export const refetchHomeFeed = () => {
  if (globalRefetchFeed) {
    globalRefetchFeed();
  }
};