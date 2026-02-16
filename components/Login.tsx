
import React from 'react';

export const LoginView: React.FC<{ onLogin: (provider: any) => void }> = ({ onLogin }) => {
  return (
    <div className="max-w-sm mx-auto p-8 bg-slate-900 border border-slate-800 rounded-3xl ghostly-glow">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-amber-500 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">👻</div>
        <h2 className="text-2xl font-black text-white">啟動探靈權限</h2>
        <p className="text-slate-500 text-sm mt-2">登入以解鎖實價登錄及投報率計算器</p>
      </div>

      <div className="space-y-4">
        <button onClick={() => onLogin('google')} className="w-full flex items-center justify-center gap-3 bg-white text-slate-950 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          使用 Google 帳號登入
        </button>
        <button onClick={() => onLogin('facebook')} className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white py-3 rounded-xl font-bold hover:bg-[#166fe5] transition-all">
          <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5 brightness-200" alt="FB" />
          使用 Facebook 登入
        </button>
        
        <div className="flex items-center gap-3 my-6">
          <div className="flex-grow h-px bg-slate-800" />
          <span className="text-[10px] text-slate-600 font-bold">OR</span>
          <div className="flex-grow h-px bg-slate-800" />
        </div>

        <div className="space-y-2">
          <input type="email" placeholder="電子郵件" className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500 text-sm" />
          <input type="password" placeholder="密碼" className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500 text-sm" />
          <button onClick={() => onLogin('email')} className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-all">登入 / 註冊</button>
        </div>
      </div>

      <p className="text-[10px] text-slate-600 text-center mt-8">
        登入即代表您同意本站之 <span className="underline">服務條款</span> 與 <span className="underline">隱私權政策</span>。
      </p>
    </div>
  );
};
