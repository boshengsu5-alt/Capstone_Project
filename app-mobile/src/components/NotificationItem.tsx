import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type NotificationItemProps = {
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
};

export default function NotificationItem({ title, message, time, isRead = false }: NotificationItemProps) {
  return (
    <View style={[styles.container, isRead && styles.readContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, isRead && styles.readText]}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text style={[styles.message, isRead && styles.readText]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  readContainer: {
    opacity: 0.6,
    borderLeftColor: '#cccccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    marginRight: 10,
  },
  time: {
    fontSize: 12,
    color: '#999999',
  },
  message: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  readText: {
    color: '#999999',
  },
});
