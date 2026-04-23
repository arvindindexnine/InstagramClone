import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Text, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUsers } from '../../services/api';
import colors from '../../theme/colors';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const filtered = users.filter((user: any) => 
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [query, users]);

  async function loadUsers() {
    const usersData = await fetchUsers();
    setUsers(usersData);
  }

  function handleUserPress(user: any) {
    (navigation as any).navigate('ChatDetail', {
      userId: user.id,
      username: user.username
    });
  }

  function renderUser({ item }: any) {
    return (
      <TouchableOpacity 
        style={styles.userItem}
        onPress={() => handleUserPress(item)}
      >
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <Text style={styles.username}>{item.username}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search users"
          placeholderTextColor={colors.placeholder}
        />
      </View>
      
      {query.trim() && filteredUsers.length === 0 ? (
        <Text style={styles.emptyText}>No users found</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id.toString()}
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
    backgroundColor: colors.background,
    paddingTop: 52,
  },
  searchBar: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 14,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.inputBackground,
  },
  username: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
});