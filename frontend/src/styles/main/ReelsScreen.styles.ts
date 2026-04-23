import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFill,
  },
  sideActions: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    alignItems: 'center',
    gap: 20,
  },
  actionItem: {
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 28,
    color: colors.text,
  },
  actionCount: {
    color: colors.text,
    fontSize: 12,
  },
  bottomInfo: {
    position: 'absolute',
    left: 16,
    bottom: 80,
  },
  username: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 4,
  },
  caption: {
    color: colors.text,
    fontSize: 14,
  },
  loadingText: {
    color: colors.text,
    textAlign: 'center',
    marginTop: 40,
  },
});