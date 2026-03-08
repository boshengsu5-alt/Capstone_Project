import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { theme } from '../../theme';
import { authService } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Handle user login
     * // Bypass state loading check before calling backend. Show alert on error. (处理登录调用，必须上锁防止用户重复疯狂连点)
     */
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('错误 (Error)', '请输入邮箱和密码 (Please enter email and password)');
            return;
        }

        setLoading(true);
        try {
            await authService.signIn(email, password);
            // Let RootNavigator handle the auth state change (登录成功后交给根导航自动切换页面，不在这里手写 navigate)
        } catch (error: any) {
            Alert.alert('登录失败 (Login Failed)', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>欢迎登录 UniGear</Text>
            <Text style={styles.subtitle}>Welcome back</Text>

            <View style={styles.form}>
                <Text style={styles.label}>邮箱 (Email)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="your.email@example.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>密码 (Password)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.colors.background} />
                    ) : (
                        <Text style={styles.buttonText}>登录 (Login)</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.linkText}>没有账号？去注册 (No account? Register)</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg * 1.5,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.gray,
        marginBottom: theme.spacing.lg * 2,
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: theme.spacing.md,
        fontSize: 16,
        marginBottom: theme.spacing.lg,
        backgroundColor: '#F9FAFB',
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: theme.spacing.sm,
    },
    buttonText: {
        color: theme.colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: theme.spacing.lg,
        alignItems: 'center',
    },
    linkText: {
        color: theme.colors.primary,
        fontSize: 14,
    },
});
