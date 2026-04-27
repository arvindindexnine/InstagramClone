import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 32,
  },
  language: {
    fontSize: 13,
    marginBottom: 40,
  },
  logo: {
    fontSize: 42,
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Billabong' : undefined,
    marginBottom: 36,
  },
  form: {
    width: '100%',
    marginBottom: 16,
  },
  error: {
    color: '#e74c3c',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
  forgotPassword: {
    fontSize: 13,
    marginTop: 8,
    marginBottom: 40,
  },
  createAccountWrapper: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 24,
  },
  footer: {
    fontSize: 12,
    marginTop: 16,
  },
});