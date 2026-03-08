"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth"; // 别担心，下一步咱们就建这个文件

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await signIn(email, password);
      if (authError) throw authError;

      // 登录成功，直接推送到 Dashboard 首页
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "登录失败，请检查账号密码");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 text-white">
      {/* 装饰背景 */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a1a1a,transparent)] pointer-events-none" />

      <div className="w-full max-w-[400px] relative">
        <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Logo 区域 */}
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              <span className="text-2xl font-bold">L</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Letao Assets</h1>
            <p className="text-zinc-500 text-sm mt-2">资产管理系统后台</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input 
                type="email" 
                placeholder="管理邮箱" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="密码" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center font-medium animate-shake">
                {error}
              </p>
            )}

            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 py-4 rounded-2xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
              {loading ? "验证中..." : "立即登录"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
