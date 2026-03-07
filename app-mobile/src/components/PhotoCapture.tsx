import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function PhotoCapture() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>拍照组件就绪</Text>
      <TouchableOpacity style={styles.captureButton}>
        <View style={styles.innerButton} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    alignItems: 'center', 
    backgroundColor: '#333333', 
    borderRadius: 12,
    marginVertical: 10
  },
  text: { 
    fontSize: 16, 
    color: '#ffffff', 
    marginBottom: 20 
  },
  captureButton: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: '#ffffff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 3, 
    borderColor: '#aaaaaa' 
  },
  innerButton: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#FF3B30' 
  }
});
