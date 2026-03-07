import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function QRScanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>扫码组件加载中...</Text>
      {/* 假装这里有一个扫描框 */}
      <View style={styles.scannerBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  text: { fontSize: 16, color: '#333333', marginBottom: 20 },
  scannerBox: { 
    width: 200, 
    height: 200, 
    borderWidth: 2, 
    borderColor: '#00FF00', 
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    borderRadius: 16
  }
});
