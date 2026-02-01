import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// ⚠️ 把下面的 'URL' 和 'Key' 换成你刚才在 Supabase 网站上看到的
const supabaseUrl = 'https://gszzizawneqkbijqyxqy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzenppemF3bmVxa2JpanF5eHF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTIxMTIsImV4cCI6MjA4NTUyODExMn0.OckgL8QuXPN_e_7X1wrZRcto2ZBqYTEVO1S_lgF1WWM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});