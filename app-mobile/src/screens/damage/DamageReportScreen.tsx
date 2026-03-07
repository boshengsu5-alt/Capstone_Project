import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function DamageReportScreen() {
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>损坏报修</Text>
        
        <Text style={styles.label}>报修设备：</Text>
        <View style={styles.card}>
          <Text style={styles.value}>Canon 24-70mm 镜头</Text>
          <Text style={styles.sn}>SN: 20045</Text>
        </View>

        <Text style={styles.label}>损坏情况描述：</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={6}
          placeholder="请详细描述设备损坏情况，至少10个字。提交后将由老师人工核验是否扣除信用分..."
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        <Text style={styles.label}>上传损坏区域照片：</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <Text style={styles.uploadText}>+ 拍摄或选择照片</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>提交客诉单</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FD' },
  scroll: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#FF3B30' },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#e0e0e0' },
  value: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  sn: { fontSize: 12, color: '#999', marginTop: 4 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 16, fontSize: 16, borderWidth: 1, borderColor: '#e0e0e0', height: 120 },
  uploadBox: { height: 100, backgroundColor: '#fff', borderRadius: 8, borderWidth: 2, borderColor: '#e0e0e0', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  uploadText: { color: '#6200ee', fontSize: 16, fontWeight: 'bold' },
  submitButton: { backgroundColor: '#FF3B30', padding: 16, borderRadius: 8, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
