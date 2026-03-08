import { supabase } from './supabase';

/**
 * Auth Service
 * // Centralized service for User Authentication (用户认证服务中心)
 */
export const authService = {
    /**
     * Sign In with Email/Password
     * // Use email and password for regular sign in. (使用邮箱密码登录系统)
     */
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            // Throw clear error message to UI (抛出错误信息交给 UI 渲染层处理)
            throw new Error(error.message);
        }
        return data;
    },

    /**
     * Sign Up new User
     * // Register a new user in Supabase auth and capture additional metadata like fullName. (注册新账号，附加存储真实姓名以便建档)
     */
    async signUp(email: string, password: string, fullName: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });
        if (error) {
            // Catch specific errors for user feedback (捕获具体错误以提供有效反馈)
            throw new Error(error.message);
        }
        return data;
    },

    /**
     * Sign Out Current User
     * // Clear local session and sign out. (清空本地会话并登出账户)
     */
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw new Error(error.message);
        }
    },

    /**
     * Get Current Session
     * // Check if user has active session. (检查当前用户登录会话状态)
     */
    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw new Error(error.message);
        return session;
    }
};
