import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    color: colors.text,
    fontSize: 22,
  },
  title: {
    color: colors.text,
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
    color: colors.textMuted,
    fontSize: 13,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});