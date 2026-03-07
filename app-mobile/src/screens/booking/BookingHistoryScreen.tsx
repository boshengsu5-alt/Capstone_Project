import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

const FAKE_BOOKINGS = [
  { id: '1', item: 'Sony A7M4', date: '2026-03-05', status: '已归还' },
  { id: '2', item: 'DJI Ronin RS3', date: '2026-03-07', status: '已借用' },
  { id: '3', item: 'Canon 24-70mm', date: '2026-03-01', status: '已逾期' },
  { id: '4', item: 'Apple iPad Pro', date: '2026-03-06', status: '已借用' },
];

export default function BookingHistoryScreen() {
  const renderItem = ({ item }: { item: any }) => {
    let statusColor = '#4CAF50'; // 绿 - 已归还
    if (item.status === '已逾期') statusColor = '#F44336'; // 红
    if (item.status === '已借用') statusColor = '#FF9800'; // 黄

    return (
      <View style={[styles.card, { borderLeftColor: statusColor }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.itemName}>{item.item}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.status, { color: statusColor }]}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.date}>借用日期：{item.date}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>我的借用记录</Text>
      <FlatList
        data={FAKE_BOOKINGS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FD',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666666',
  },
});
