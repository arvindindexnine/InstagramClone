import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
  },
  postCard: {
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  postAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  postUsername: {
    fontWeight: '600',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 380,
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 14,
  },
  actionBtn: {
    padding: 2,
  },
  actionIcon: {
    fontSize: 24,
  },
  caption: {
    fontSize: 13,
    paddingHorizontal: 12,
    marginTop: 6,
    marginBottom: 12,
  },
  storiesContainer: {
    maxHeight: 100,
    borderBottomWidth: 0.5,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    paddingVertical: 12,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyUsername: {
    fontSize: 12,
    marginTop: 4,
    maxWidth: 70,
  },
  likesText: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 12,
    marginTop: 8,
  },
});