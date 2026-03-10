import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { signOut, getCurrentUser } from '../../services/authService';

export default function ProfileScreen() {
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setEmail(user.email ?? '');
        setFullName(user.user_metadata?.full_name ?? '用户');
      })
      .catch(() => {
        setEmail('');
        setFullName('用户');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSignOut = () => {
    Alert.alert('确认退出', '确定要退出登录吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '退出',
        style: 'destructive',
        onPress: async () => {
          setLoggingOut(true);
          try {
            await signOut();
            // RootNavigator 会自动检测 session 变为 null，跳转到登录页
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : '退出失败';
            Alert.alert('错误', message);
            setLoggingOut(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 头部用户信息 */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* 菜单区域 */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={22} color={theme.colors.text} />
          <Text style={styles.menuText}>消息通知</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={22} color={theme.colors.text} />
          <Text style={styles.menuText}>设置</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.gray} />
        </TouchableOpacity>
      </View>

      {/* 退出登录按钮 */}
      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleSignOut}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.logoutText}>退出登录</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingBottom: theme.spacing.xl + 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  menuSection: {
    marginTop: theme.spacing.lg,
    backgroundColor: '#fff',
    marginHorizontal: theme.spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  logoutSection: {
    marginTop: 'auto',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  logoutButton: {
    backgroundColor: theme.colors.danger,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
