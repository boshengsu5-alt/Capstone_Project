import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'BookingFormScreen'>;

export default function BookingFormScreen({ route, navigation }: Props) {
  const assetId = route.params?.assetId;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>提交借用申请</Text>
        <Text style={styles.subtitle}>正在为设备 ID: {assetId} 办理借用</Text>
        
        <View style={styles.card}>
            <Text style={styles.placeholder}>借用表单内容开发中...</Text>
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => {
              alert('预约申请已提交！');
              navigation.popToTop(); // Return to Home
          }}
        >
          <Text style={styles.submitButtonText}>确认并提交</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: theme.spacing.xl,
    height: 200,
  },
  placeholder: {
    color: theme.colors.text,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
