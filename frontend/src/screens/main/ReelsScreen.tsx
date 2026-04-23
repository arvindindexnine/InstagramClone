import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { fetchReels, fetchUsers } from '../../services/api';
import { styles } from '../../styles/main/ReelsScreen.styles';

export default function ReelsScreen() {
  const [reels, setReels] = useState<any[]>([]);
  const [currentIndex] = useState(0);

  useEffect(() => {
    loadReels();
  }, []);

  async function loadReels() {
    const reelsData = fetchReels();
    const usersData = await fetchUsers();
    
    const reelsWithUsers = reelsData.map((reel: any) => {
      const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
      return { ...reel, user: randomUser };
    });
    
    setReels(reelsWithUsers);
  }

  const currentReel = reels[currentIndex];
  
  if (!currentReel) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: currentReel.sources[0] }}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
      />

      <View style={styles.sideActions}>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>♡</Text>
          <Text style={styles.actionCount}>12k</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>340</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>➤</Text>
          <Text style={styles.actionCount}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomInfo}>
        <Text style={styles.username}>@{currentReel.user?.username || 'user'}</Text>
        <Text style={styles.caption}>{currentReel.title}</Text>
      </View>
    </View>
  );
}