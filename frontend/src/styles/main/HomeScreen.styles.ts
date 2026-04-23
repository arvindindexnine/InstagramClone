import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.inputBorder,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  loadingText: {
    color: colors.textMuted,
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
    backgroundColor: colors.inputBackground,
  },
  postUsername: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 380,
    backgroundColor: colors.inputBackground,
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
    color: colors.text,
  },
  caption: {
    color: colors.text,
    fontSize: 13,
    paddingHorizontal: 12,
    marginTop: 6,
    marginBottom: 12,
  },
  storiesContainer: {
    maxHeight: 100,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.inputBorder,
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
    backgroundColor: colors.inputBackground,
  },
  storyUsername: {
    color: colors.text,
    fontSize: 12,
    marginTop: 4,
    maxWidth: 70,
  },
  likesText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 12,
    marginTop: 8,
  },
});