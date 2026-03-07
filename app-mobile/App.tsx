import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, Animated } from 'react-native';
import ScanScreen from './src/screens/scan/ScanScreen';

// Temporary home screen to test the "Back" button from scanner
const TempHomeScreen = ({ onOpenScanner }: { onOpenScanner: () => void }) => (
  <SafeAreaView style={styles.homeContainer}>
    <Text style={styles.homeTitle}>UniGear</Text>
    <Text style={styles.homeSubtitle}>校园资产管理系统</Text>
    <TouchableOpacity style={styles.scanButton} onPress={onOpenScanner}>
      <Text style={styles.scanButtonText}>📸 打开扫码出库</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'scan'>('home');
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

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="dark-content" />
      {currentScreen === 'home' ? (
        <TempHomeScreen onOpenScanner={() => setCurrentScreen('scan')} />
      ) : (
        <ScanScreen onBack={() => setCurrentScreen('home')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: '#F7F7FD' },
  // Home Screen Styles
  homeContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F7FD' },
  homeTitle: { fontSize: 32, fontWeight: '900', color: '#6200ee' },
  homeSubtitle: { fontSize: 16, color: '#666', marginTop: 8, marginBottom: 40 },
  scanButton: { backgroundColor: '#6200ee', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 100, shadowColor: '#6200ee', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  scanButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
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
