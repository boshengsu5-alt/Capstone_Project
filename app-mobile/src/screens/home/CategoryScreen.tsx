import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { theme } from '../../theme';

type CategoryScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CategoryScreen'>;

interface Props {
  navigation: CategoryScreenNavigationProp;
}

const CATEGORIES = [
  { id: 'camera', name: '相机', icon: 'camera-outline' },
  { id: 'drone', name: '无人机', icon: 'airplane-outline' },
  { id: 'lab', name: '实验室设备', icon: 'flask-outline' },
  { id: 'office', name: '办公用品', icon: 'briefcase-outline' },
  { id: 'audio', name: '音响设备', icon: 'headset-outline' },
  { id: 'books', name: '书籍资料', icon: 'book-outline' },
];

export default function CategoryScreen({ navigation }: Props) {
  const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <TouchableOpacity 
      style={styles.categoryItem} 
      onPress={() => navigation.navigate('HomeScreen', { categoryId: item.id })}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon as any} size={32} color={theme.colors.primary} />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridOverlay}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background 
  },
  gridOverlay: {
    padding: theme.spacing.md,
  },
  row: {
    justifyContent: 'flex-start',
  },
  categoryItem: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3E8FF', // Light purple background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  }
});
