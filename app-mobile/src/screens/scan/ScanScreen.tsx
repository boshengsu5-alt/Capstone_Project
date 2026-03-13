import React, { useState, useEffect, useCallback } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import QRScanner from '../../components/QRScanner';
import { getAssetById } from '../../services/assetService';

export default function ScanScreen() {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [isScanning, setIsScanning] = useState(true);

  // 每次页面重新获得焦点时，确保可以扫描
  useEffect(() => {
    if (isFocused) {
      setIsScanning(true);
    }
  }, [isFocused]);

  const handleScan = useCallback(async (data: string) => {
    if (!isScanning) return;
    
    setIsScanning(false); // 立刻阻止重复扫码
    
    try {
      // Data scanned is treated as assetId per current logic
      const asset = await getAssetById(data);
      if (!asset) {
        Alert.alert('扫描失败', '未找到对应的设备信息，请检查二维码是否有效。', [
          { text: '好的', onPress: () => setIsScanning(true) }
        ]);
        return;
      }

      // 跳转到 Home Tab 的 AssetDetailScreen 查看详情
      navigation.navigate('HomeTab', {
        screen: 'AssetDetailScreen',
        params: { id: data },
      });
    } catch (error) {
      Alert.alert('扫描错误', '获取设备信息时出错，请稍后重试。', [
        { text: '好的', onPress: () => setIsScanning(true) }
      ]);
    }
  }, [isScanning, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>设备扫码</Text>
        <Text style={styles.subtitle}>快速查看资产详情</Text>
      </View>
      
      <View style={styles.scannerWrapper}>
        <QRScanner onScan={handleScan} isScanning={isScanning && isFocused} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  scannerWrapper: {
    flex: 1,
  },
});
