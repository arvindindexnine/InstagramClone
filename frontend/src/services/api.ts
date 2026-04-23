export async function fetchPosts() {
  try {
    const response = await fetch('https://dummyjson.com/posts');
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.log('Error fetching posts:', error);
    return [];
  }
}

export async function fetchUsers() {
  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.log('Error fetching users:', error);
    return [];
  }
}

export function fetchReels() {
  try {
    const mediaData = require('../data/media.json');
    return mediaData.categories[0].videos;
  } catch (error) {
    console.log('Error loading reels:', error);
    return [];
  }
}