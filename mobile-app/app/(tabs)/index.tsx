import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';
// 这里的路径 ../../lib/supabase 指向你刚才建好的那个文件
import { supabase } from '../../lib/supabase'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 注册功能
  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("注册失败", error.message);
    } else {
      Alert.alert("注册成功！", "请去 Supabase 后台查看你的新用户。");
    }
    setLoading(false);
  }

  // 登录功能
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("登录失败", error.message);
    } else {
      Alert.alert("登录成功！", "连接完全正常！");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UniGear 连接测试</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="请输入邮箱 (test@test.com)"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true} // 密码隐藏
          placeholder="请输入密码 (6位以上)"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="注册 (Sign Up)" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="登录 (Sign In)" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { marginBottom: 12 },
  input: { height: 45, borderColor: 'gray', borderWidth: 1, paddingLeft: 10, borderRadius: 5 },
  buttonContainer: { marginTop: 10 },
});