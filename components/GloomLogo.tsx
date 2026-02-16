
import React from 'react';

export const GloomLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5L35 32H5L20 5Z" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 15C22 15 24 17 24 20C24 23 20 27 20 27C20 27 16 23 16 20C16 17 18 15 20 15Z" fill="#f59e0b" className="animate-pulse" />
        <circle cx="20" cy="20" r="18" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
      <div className="absolute -top-1 -right-1 flex gap-1">
        {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-amber-500 rounded-full animate-ping" style={{animationDelay: `${i*0.3}s`}} />)}
      </div>
    </div>
    <div>
      <h1 className="text-2xl font-bold tracking-tighter text-amber-500 leading-none">幽居</h1>
      <p className="text-[10px] text-amber-200 uppercase tracking-widest">Hauntly System</p>
    </div>
  </div>
);

export const AppIcon: React.FC = () => (
  <div className="w-24 h-24 rounded-3xl bg-slate-950 border-2 border-amber-500 flex items-center justify-center ghostly-glow overflow-hidden relative group">
    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent" />
    <GloomLogo className="scale-125" />
  </div>
);
