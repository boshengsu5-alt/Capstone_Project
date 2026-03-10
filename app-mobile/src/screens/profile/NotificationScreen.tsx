import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function NotificationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>消息通知</Text>
        {/* 占位符：未来将会在此渲染 NotificationItem 列表 */}
        <View style={styles.emptyState}>
          <Text style={styles.placeholderText}>暂无新通知</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    marginTop: 10,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999999',
  },
});
