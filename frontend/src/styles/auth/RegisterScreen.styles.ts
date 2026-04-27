import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 32,
  },
  backButton: {
    marginBottom: 24,
  },
  backArrow: {
    fontSize: 22,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 28,
  },
  form: {
    width: '100%',
    marginBottom: 24,
  },
  error: {
    color: '#e74c3c',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    fontSize: 13,
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '600',
  },
});