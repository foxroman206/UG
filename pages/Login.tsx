import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { auth } from '../firebase'; // 確保 firebase.js 已放在根目錄
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const Login: React.FC<{ lang: Language, onLogin: () => void }> = ({ lang, onLogin }) => {
  const t = TRANSLATIONS[lang];

  // 表單狀態
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // 註冊時用的姓名
  const [isRegisterMode, setIsRegisterMode] = useState(false); // 登入/註冊切換
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Google 登入（真實彈出視窗）
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Google 登入成功！歡迎 ${user.displayName || '使用者'}`);
      onLogin(); // 登入成功後跳轉到首頁
    } catch (err: any) {
      setError(err.message || 'Google 登入失敗，請再試一次');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 信箱註冊（真實註冊）
  const handleEmailRegister = async () => {
    if (!email || !password || !name) {
      setError('請填寫姓名、信箱和密碼');
      return;
    }
    if (password.length < 6) {
      setError('密碼至少 6 個字元');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // 這裡可以存姓名到 displayName（Firebase 會自動更新）
      await user.updateProfile({ displayName: name });

      alert(`註冊成功！歡迎 ${name}`);
      onLogin(); // 註冊成功後跳轉
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('此信箱已註冊，請直接登入');
      } else if (err.code === 'auth/invalid-email') {
        setError('信箱格式錯誤');
      } else {
        setError(err.message || '註冊失敗');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 信箱登入
  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError('請填寫信箱和密碼');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('登入成功！');
      onLogin();
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('信箱或密碼錯誤');
      } else {
        setError(err.message || '登入失敗');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-amber-500/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-amber-500/10 rounded-full animate-pulse"></div>
      </div>

      <header className="mb-12 text-center relative z-10">
        <h1 className="text-5xl font-serif italic mb-2 tracking-tighter text-amber-500">GhostGuide</h1>
        <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-bold">{t.login}</p>
      </header>

      <div className="w-full max-w-sm space-y-6 relative z-10">
        <div className="metallic-glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* 切換登入/註冊 */}
          <div className="text-center">
            <button
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-amber-500 hover:underline"
            >
              {isRegisterMode ? '已有帳號？登入' : '還沒有帳號？註冊'}
            </button>
          </div>

          {isRegisterMode ? (
            // 註冊表單
            <>
              <input
                type="text"
                placeholder="姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-amber-500/50"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-amber-500/50"
              />
              <input
                type="password"
                placeholder="密碼（至少6位）"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-amber-500/50"
              />
              <button
                onClick={handleEmailRegister}
                disabled={loading}
                className="w-full bg-amber-500 text-slate-950 py-4 rounded-2xl font-bold text-sm hover:bg-amber-400 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? '註冊中...' : '註冊'}
              </button>
            </>
          ) : (
            // 登入表單
            <>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-amber-500/50"
              />
              <input
                type="password"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-amber-500/50"
              />
              <button
                onClick={handleEmailLogin}
                disabled={loading}
                className="w-full bg-slate-800 text-slate-200 py-4 rounded-2xl font-bold text-sm border border-slate-700 hover:border-amber-500/50 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? '登入中...' : t.emailLogin}
              </button>
            </>
          )}

          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-700 text-[10px] font-bold">OR</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Google 登入按鈕 */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-950 py-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50 shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
        </div>

        <button
          onClick={onLogin}
          className="w-full text-slate-600 text-xs font-bold uppercase tracking-widest hover:text-amber-500 transition-colors"
        >
          {t.guest}
        </button>
      </div>
    </div>
  );
};

export default Login;