import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { theme } from '../../theme';
import { authService } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
    const navigation = useNavigation<any>();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Handle user registration
     * // Validate input completeness before invoking the auth service for signup. (在调用注册服务前，严格校验输入框不能为空格)
     */
    const handleRegister = async () => {
        if (!fullName || !email || !password) {
            Alert.alert('错误 (Error)', '请填写所有字段 (Please fill in all fields)');
            return;
        }

        if (password.length < 6) {
            Alert.alert('错误 (Error)', '密码至少需要6位 (Password must be at least 6 characters)');
            return;
        }

        setLoading(true);
        try {
            await authService.signUp(email, password, fullName);
            Alert.alert(
                '注册成功 (Success)',
                '账号已创建，即将返回登录页面 (Account created, returning to login)',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } catch (error: any) {
            Alert.alert('注册失败 (Registration Failed)', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>注册 (Register)</Text>
                <Text style={styles.subtitle}>Create your UniGear account</Text>

                <View style={styles.form}>
                    <Text style={styles.label}>真实姓名 (Full Name)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="张三 / John Doe"
                        value={fullName}
                        onChangeText={setFullName}
                    />

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
                        placeholder="至少6位密码 (At least 6 characters)"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={theme.colors.background} />
                        ) : (
                            <Text style={styles.buttonText}>创建账号 (Create Account)</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.linkText}>已有账号？返回登录 (Already have an account? Login)</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        flexGrow: 1,
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
        color: theme.colors.gray,
        fontSize: 14,
    },
});
