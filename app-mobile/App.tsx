import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, Animated, ScrollView } from 'react-native';
import ScanScreen from './src/screens/scan/ScanScreen';
import NotificationScreen from './src/screens/profile/NotificationScreen';
import BookingHistoryScreen from './src/screens/booking/BookingHistoryScreen';
import ReturnScreen from './src/screens/booking/ReturnScreen';
import DamageReportScreen from './src/screens/damage/DamageReportScreen';

type ScreenName = 'home' | 'scan' | 'notifications' | 'booking_history' | 'return_device' | 'damage_report';

// Temporary home screen to test all views
const TempHomeScreen = ({ onNavigate }: { onNavigate: (screen: ScreenName) => void }) => (
  <SafeAreaView style={styles.homeContainer}>
    <Text style={styles.homeTitle}>UniGear</Text>
    <Text style={styles.homeSubtitle}>校园资产管理系统</Text>
    
    <ScrollView contentContainerStyle={styles.scrollButtons}>
      <TouchableOpacity style={styles.scanButton} onPress={() => onNavigate('scan')}>
        <Text style={styles.scanButtonText}>📸 扫码出库 (ScanScreen)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => onNavigate('booking_history')}>
        <Text style={styles.navButtonText}>📋 借用记录 (BookingHistory)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navButton} onPress={() => onNavigate('return_device')}>
        <Text style={styles.navButtonText}>📦 归还设备 (ReturnScreen)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => onNavigate('damage_report')}>
        <Text style={styles.navButtonText}>⚠️ 损坏报修 (DamageReport)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => onNavigate('notifications')}>
        <Text style={styles.navButtonText}>🔔 消息通知 (Notifications)</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Simulate App Loading/Splash Screen Time
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsAppReady(true);
      });
    }, 2500); // 2.5s splash screen
  }, []);

  if (!isAppReady) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>U</Text>
        </View>
        <Text style={styles.brandName}>UniGear</Text>
        <Text style={styles.slogan}>高校领先的智能租赁仓库</Text>
        <Text style={styles.loadingText}>系统启动中...</Text>
      </Animated.View>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <TempHomeScreen onNavigate={setCurrentScreen} />;
      case 'scan':
        return <ScanScreen onBack={() => setCurrentScreen('home')} />;
      case 'notifications':
        return (
          <View style={{ flex: 1 }}>
            <View style={styles.simulatedHeader}><TouchableOpacity onPress={() => setCurrentScreen('home')}><Text style={styles.simulatedBack}>← 返回大厅</Text></TouchableOpacity></View>
            <NotificationScreen />
          </View>
        );
      case 'booking_history':
        return (
          <View style={{ flex: 1 }}>
            <View style={styles.simulatedHeader}><TouchableOpacity onPress={() => setCurrentScreen('home')}><Text style={styles.simulatedBack}>← 返回大厅</Text></TouchableOpacity></View>
            <BookingHistoryScreen />
          </View>
        );
      case 'return_device':
        return (
          <View style={{ flex: 1 }}>
            <View style={styles.simulatedHeader}><TouchableOpacity onPress={() => setCurrentScreen('home')}><Text style={styles.simulatedBack}>← 返回大厅</Text></TouchableOpacity></View>
            <ReturnScreen />
          </View>
        );
      case 'damage_report':
        return (
          <View style={{ flex: 1 }}>
            <View style={styles.simulatedHeader}><TouchableOpacity onPress={() => setCurrentScreen('home')}><Text style={styles.simulatedBack}>← 返回大厅</Text></TouchableOpacity></View>
            <DamageReportScreen />
          </View>
        );
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: '#F7F7FD' },
  simulatedHeader: { paddingTop: 50, paddingBottom: 10, paddingHorizontal: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  simulatedBack: { color: '#6200ee', fontWeight: 'bold', fontSize: 16 },
  
  // Home Screen Styles
  homeContainer: { flex: 1, backgroundColor: '#F7F7FD', alignItems: 'center', paddingTop: 60 },
  homeTitle: { fontSize: 32, fontWeight: '900', color: '#6200ee' },
  homeSubtitle: { fontSize: 16, color: '#666', marginTop: 8, marginBottom: 20 },
  scrollButtons: { alignItems: 'center', paddingBottom: 40, width: '100%', paddingHorizontal: 20 },
  
  scanButton: { backgroundColor: '#6200ee', width: '100%', paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginBottom: 20, shadowColor: '#6200ee', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  scanButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  navButton: { backgroundColor: '#ffffff', width: '100%', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#e0e0e0' },
  navButtonText: { color: '#333', fontSize: 16, fontWeight: '600' },
  
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: '#1E1B4B', // Deep premium purple
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6366F1', // Electric blue/purple
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 64,
    fontWeight: '900',
    color: '#ffffff',
  },
  brandName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  slogan: {
    fontSize: 16,
    color: '#A5B4FC',
    marginTop: 12,
    letterSpacing: 1,
  },
  loadingText: {
    position: 'absolute',
    bottom: 50,
    color: '#A5B4FC',
    fontSize: 14,
  }
});
