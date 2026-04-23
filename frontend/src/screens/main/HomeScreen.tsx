import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { fetchPosts, fetchUsers } from '../../services/api';
import { styles } from '../../styles/main/HomeScreen.styles';

export default function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [postsData, usersData] = await Promise.all([
      fetchPosts(),
      fetchUsers()
    ]);
    
    const postsWithUsers = postsData.map((post: any) => {
      const user = usersData.find((u: any) => u.id === post.userId);
      return { ...post, user };
    });
    
    setPosts(postsWithUsers);
    setUsers(usersData.slice(0, 10));
    setLoading(false);
  }

  function renderStory({ item }: any) {
    return (
      <TouchableOpacity style={styles.storyItem}>
        <Image source={{ uri: item.image }} style={styles.storyAvatar} />
        <Text style={styles.storyUsername}>{item.username}</Text>
      </TouchableOpacity>
    );
  }

  function renderPost({ item }: any) {
    const imageUrl = `https://picsum.photos/400/400?random=${item.id}`;
    
    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <Image 
            source={{ uri: item.user?.image || 'https://picsum.photos/40/40?random=user' }} 
            style={styles.postAvatar} 
          />
          <Text style={styles.postUsername}>{item.user?.username || 'user'}</Text>
        </View>

        <Image source={{ uri: imageUrl }} style={styles.postImage} />

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>♡</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.likesText}>{item.reactions} likes</Text>

        <Text style={styles.caption}>
          <Text style={styles.postUsername}>{item.user?.username || 'user'} </Text>
          {item.title}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Instagram</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={renderStory}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storiesContainer}
          />
          
          <FlatList
            data={posts}
            keyExtractor={item => item.id.toString()}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}