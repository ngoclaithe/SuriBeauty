"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Lock, Mail, Eye, EyeOff, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(email, password);
      setAuth(res.access_token, res.user);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#1a1a2e] to-slate-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
      <div className="absolute top-10 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

      <Card className="w-full max-w-md mx-4 p-0 border-0 shadow-2xl overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/10">
        {/* Header */}
        <div className="p-8 pb-0 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-rose-500 shadow-lg shadow-primary/30 mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            <span className="font-heading bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">SURI</span>
            <span className="text-white/60 text-lg font-normal ml-2">Admin</span>
          </h1>
          <p className="text-white/40 text-sm">Đăng nhập để quản lý hệ thống</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@suri.vn"
                required
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl h-12 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl h-12 focus:border-primary/50 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-primary to-rose-500 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang đăng nhập...</>
            ) : (
              "Đăng nhập"
            )}
          </Button>

          <p className="text-center text-white/20 text-xs pt-2">
            Mặc định: admin@suri.vn / admin123
          </p>
        </form>
      </Card>
    </div>
  );
}
