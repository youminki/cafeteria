import { useState, type FormEvent } from "react";
import { Utensils, ArrowRight, User } from "lucide-react";
import { motion } from "motion/react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { UserInfo } from "../lib/types";

interface GoogleJwtPayload {
  name?: string;
  given_name?: string;
  email?: string;
  picture?: string;
}

interface LoginProps {
  onLogin: (user: UserInfo) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onLogin({ nickname: nickname.trim(), provider: "local" });
    }
  };

  const handleGoogleSuccess = (response: CredentialResponse) => {
    if (!response.credential) return;
    const decoded = jwtDecode<GoogleJwtPayload>(response.credential);
    onLogin({
      nickname: decoded.name || decoded.given_name || "Google User",
      email: decoded.email,
      picture: decoded.picture,
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-slate-200 shadow-2xl overflow-hidden"
      >
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-900 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-slate-200">
            <Utensils className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">
            cafeteria
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-12">
            Smart Dining System
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              시작하기
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4 text-slate-300">
            <div className="h-px bg-slate-100 flex-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">or</span>
            <div className="h-px bg-slate-100 flex-1" />
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {}}
              shape="rectangular"
              theme="outline"
              text="signin_with"
              width="350"
            />
          </div>

          <div className="mt-12 pt-12 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-relaxed">
              본 시스템은 사내 식당 좌석 예약 및 현황 파악을 위한 전용
              시스템입니다.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
