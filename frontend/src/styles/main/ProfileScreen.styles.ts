import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_SIZE = SCREEN_WIDTH / 3;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 52,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: '700',
    fontSize: 16,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  themeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  themeBtnText: {
    fontSize: 16,
  },
  postButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  logoutButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
  gridItem: {
    width: ITEM_SIZE,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingBottom: 32,
    paddingTop: 16,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 0.5,
  },
  modalOptionText: {
    fontSize: 15,
  },
  modalCancel: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 0.5,
    marginTop: 4,
  },
  modalCancelText: {
    color: '#e74c3c',
    fontSize: 15,
    textAlign: 'center',
  },
});