import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Text, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import { useTheme } from '../../theme/ThemeContext';
import { SEARCH_USERS } from '../../graphql/users/searchUsers.query';

type User = {
  _id: string;
  username: string;
};

export default function SearchScreen() {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation();

  const [searchUsers, { loading }] = useLazyQuery(SEARCH_USERS, {
    onCompleted: (data) => {
      setUsers(data.searchUsers || []);
    },
    onError: (error) => {
      console.log('Search error:', error);
      setUsers([]);
    },
  });

  useEffect(() => {
    if (query.length > 1) {
      searchUsers({ variables: { query } });
    } else {
      setUsers([]);
    }
  }, [query]);

  function handleSelectUser(user: User) {
    (navigation as any).navigate('Chat', {
      screen: 'ChatDetail',
      params: {
        chatId: '',
        otherUserId: user._id,
        otherUsername: user.username,
      },
    });
  }

  function renderUser({ item }: { item: User }) {
    return (
      <View style={[styles.userItem, { borderBottomColor: theme.inputBorder }]}>
        <Text style={[styles.username, { color: theme.text }]}>{item.username}</Text>
        <TouchableOpacity 
          style={styles.arrowButton}
          onPress={() => handleSelectUser(item)}
        >
          <Text style={[styles.arrowIcon, { color: theme.primary }]}>→</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.searchBar}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
          value={query}
          onChangeText={setQuery}
          placeholder="Search users"
          placeholderTextColor={theme.placeholder}
          autoCapitalize="none"
        />
      </View>
      
      {query.length > 1 && users.length === 0 && !loading ? (
        <Text style={[styles.emptyText, { color: theme.textMuted }]}>No users found</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item._id}
          renderItem={renderUser}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 52,
  },
  searchBar: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
  },
  arrowButton: {
    padding: 8,
  },
  arrowIcon: {
    fontSize: 24,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
});