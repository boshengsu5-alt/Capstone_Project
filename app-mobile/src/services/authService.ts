import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

// ============================================================
// Auth Service — 认证服务
// ============================================================

/**
 * Register a new user with email, password, and full name.
 * 使用邮箱、密码和姓名注册新用户
 *
 * @param email - University email address. 学校邮箱
 * @param password - User password (min 6 chars). 用户密码（至少6位）
 * @param fullName - Display name. 显示名称
 * @returns Supabase auth data with user and session. 包含用户和会话的认证数据
 */
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });
  if (error) throw error;
  return data;
}

/**
 * Sign in with email and password.
 * 使用邮箱和密码登录
 *
 * @param email - University email address. 学校邮箱
 * @param password - User password. 用户密码
 * @returns Supabase session data. Supabase 会话数据
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

/** Sign out the current user. 退出登录 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** Get current session, null if not logged in. 获取当前会话，未登录返回 null */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/** Get current authenticated user, throws if not logged in. 获取当前登录用户，未登录则抛出错误 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error('用户未登录');
  return user;
}

/**
 * Listen to auth state changes (for RootNavigator real-time page switching).
 * 监听认证状态变化（用于 RootNavigator 实时切换页面）
 *
 * @param callback - Called with session on every auth change. 每次认证变化时调用
 * @returns Subscription object with unsubscribe method. 包含取消订阅方法的对象
 */
export function onAuthStateChange(callback: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}

/**
 * Get current user's profile from the profiles table.
 * 从 profiles 表获取当前用户的完整资料
 *
 * @returns User profile data. 用户资料数据
 */
export async function getMyProfile() {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}
