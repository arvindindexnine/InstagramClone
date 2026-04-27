import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Dimensions, 
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import Video from 'react-native-video';
import { mockReels } from '../../data/mockReels';

const SCREEN_HEIGHT = Dimensions.get('window').height;

type Reel = {
  id: string;
  username: string;
  caption: string;
  likes: number;
  comments: number;
  videoUrl: string;
  thumbnail: string;
};

export default function ReelsScreen() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log('ReelsScreen mounted');
    console.log('Mock reels count:', mockReels.length);
    setReels(mockReels);
  }, []);

  function onViewableItemsChanged({ viewableItems }: { viewableItems: any[] }) {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index || 0;
      console.log('Switched to reel index:', newIndex);
      setCurrentIndex(newIndex);
    }
  }

  function renderReel({ item, index }: { item: Reel; index: number }) {
    const isActive = index === currentIndex;
    console.log('Rendering reel:', item.id, 'isActive:', isActive);

    return (
      <View style={styles.reelContainer}>
        <Video
          source={{ uri: item.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          repeat={true}
          muted={true}
          paused={!isActive}
          controls={false}
          playInBackground={false}
          playWhenInactive={false}
          poster={item.thumbnail}
          posterResizeMode="cover"
          onLoad={(data) => {
            console.log('Video loaded for reel:', item.id);
            console.log('Video dimensions:', data.naturalSize);
          }}
          onError={(error) => {
            console.log('Video error for reel:', item.id, error);
            Alert.alert('Video Error', `Failed to load video for ${item.username}`);
          }}
          onLoadStart={() => console.log('Video load started for reel:', item.id)}
        />
        
        <View style={styles.overlay}>
          <View style={styles.bottomContent}>
            <Text style={styles.username}>@{item.username}</Text>
            <Text style={styles.caption}>{item.caption}</Text>
          </View>

          <View style={styles.sideActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>♡</Text>
              <Text style={styles.actionText}>{item.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionText}>{item.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reels}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ 
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 100 
        }}
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    zIndex: 1,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 100,
    paddingLeft: 15,
    paddingRight: 15,
  },
  sideActions: {
    justifyContent: 'flex-end',
    paddingBottom: 100,
    paddingRight: 15,
    width: 60,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  caption: {
    color: 'white',
    fontSize: 14,
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 25,
  },
  actionIcon: {
    color: 'white',
    fontSize: 28,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});