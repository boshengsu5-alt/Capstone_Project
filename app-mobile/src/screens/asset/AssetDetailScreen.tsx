import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'AssetDetailScreen'>;

const { width } = Dimensions.get('window');

// Mock data fetch based on ID
const getAssetDetails = (id: string) => ({
  id,
  name: id === '1' ? '特级咖啡豆' : '索尼 Alpha 7 IV 全画幅微单相机',
  description: '这是一款高性能的设备，适合各种专业场景。提供卓越的画质和稳定的性能表现。',
  location: '主校区 图书馆 3F-A区 储物柜05',
  warranty_status: '保修期内 (至 2027年5月)',
  imageUrl: 'https://via.placeholder.com/400x300.png?text=Product+Image',
  price: '¥299/天'
});

export default function AssetDetailScreen({ route, navigation }: Props) {
  const asset = getAssetDetails(route.params?.id || 'default');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Placeholder for Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: asset.imageUrl }} style={styles.image} resizeMode="cover" />
          <View style={styles.placeholderIcon}>
             <Ionicons name="camera-outline" size={60} color="#ccc" />
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Header Info */}
          <View style={styles.header}>
            <Text style={styles.title}>{asset.name}</Text>
            <Text style={styles.price}>{asset.price}</Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>商品简介</Text>
            <Text style={styles.descriptionText}>{asset.description}</Text>
          </View>

          {/* Details/Specs */}
          <View style={styles.section}>
             <Text style={styles.sectionTitle}>设备信息</Text>
             
             <View style={styles.infoRow}>
               <Ionicons name="location-outline" size={20} color={theme.colors.gray} style={styles.infoIcon} />
               <View>
                 <Text style={styles.infoLabel}>存放位置</Text>
                 <Text style={styles.infoValue}>{asset.location}</Text>
               </View>
             </View>

             <View style={styles.infoRow}>
               <Ionicons name="shield-checkmark-outline" size={20} color={theme.colors.gray} style={styles.infoIcon} />
               <View>
                 <Text style={styles.infoLabel}>保修状态</Text>
                 <Text style={styles.infoValue}>{asset.warranty_status}</Text>
               </View>
             </View>
          </View>

          {/* Calendar Placeholder */}
          <View style={styles.calendarSection}>
            <View style={styles.calendarPlaceholder}>
              <Ionicons name="calendar-outline" size={32} color={theme.colors.primary} />
              <Text style={styles.calendarText}>日历组件（待接入）</Text>
              <Text style={styles.calendarSubText}>选择您需要借用的日期</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('BookingFormScreen', { assetId: asset.id })}
        >
          <Text style={styles.bookButtonText}>立即预约</Text>
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
  },
  imageContainer: {
    width: width,
    height: 300,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  placeholderIcon: {
    opacity: 0.5
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: 100, // Space for bottom bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginRight: theme.spacing.md,
    lineHeight: 30,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  section: {
    marginBottom: theme.spacing.lg + 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  descriptionText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    backgroundColor: '#F9FAFB',
    padding: theme.spacing.md,
    borderRadius: 8,
  },
  infoIcon: {
    marginRight: theme.spacing.md,
  },
  infoLabel: {
    fontSize: 12,
    color: theme.colors.gray,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: theme.colors.text,
    fontWeight: '500',
  },
  calendarSection: {
    marginTop: theme.spacing.sm,
  },
  calendarPlaceholder: {
    height: 180,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  calendarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  calendarSubText: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10,
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
