
import React, { useState } from 'react';
import { MOCK_PROPERTIES, RISK_COLORS, TRANSLATIONS } from '../constants';
import SoulFireRating from '../components/SoulFireRating';
import { Language } from '../types';

const MapView: React.FC<{ onPropertyClick: (id: string) => void, lang: Language }> = ({ onPropertyClick, lang }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const t = TRANSLATIONS[lang];

  // Simulated map coordinates
  const markers = [
    { id: '1', x: 70, y: 35 },
    { id: '2', x: 35, y: 65 },
  ];

  const selectedProp = MOCK_PROPERTIES.find(p => p.id === (selectedId || '1'));

  return (
    <div className="h-screen w-full relative bg-slate-950 overflow-hidden">
      {/* Radar HUD Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full animate-[ping_10s_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/20"></div>
      </div>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid-map" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-map)" />
        </svg>
      </div>

      {/* Markers as Soul Flames */}
      {markers.map(m => {
        const prop = MOCK_PROPERTIES.find(p => p.id === m.id)!;
        const colorClass = RISK_COLORS[prop.riskLevel].replace('text-', 'bg-');
        
        return (
          <button
            key={m.id}
            onClick={() => setSelectedId(m.id)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center soul-fire transition-all duration-700 z-10 
              ${selectedId === m.id ? 'scale-150 z-20' : 'scale-100 opacity-80'} 
              ${colorClass} bg-opacity-40 border-2 border-white/10 group`}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
             <div className="relative">
                <div className={`absolute inset-0 blur-lg ${colorClass} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                <svg className="w-8 h-8 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c0 0-4 4.5-4 9.5s4 7.5 4 7.5 4-2.5 4-7.5S12 2 12 2zm0 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </svg>
             </div>
          </button>
        );
      })}

      {/* Detailed Overlay Peek */}
      {selectedProp && (
        <div className="absolute bottom-32 left-6 right-6 animate-in fade-in slide-in-from-bottom-20 duration-500">
          <div 
            onClick={() => onPropertyClick(selectedProp.id)}
            className="metallic-glass p-6 rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex gap-5 cursor-pointer hover:bg-white/5 transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10">
               <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
            </div>
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-700 group-hover:scale-105 transition-transform duration-500">
              <img src={selectedProp.imageUrl} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0" alt="" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-serif text-xl text-slate-100 group-hover:text-amber-500 transition-colors">{selectedProp.title[lang]}</h3>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">{selectedProp.address[lang]}</p>
              <div className="flex items-center justify-between">
                <SoulFireRating level={selectedProp.riskLevel} size="sm" />
                <span className="text-xl font-black text-amber-500 tracking-tighter">${(selectedProp.price/1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search HUD */}
      <div className="absolute top-8 left-6 right-6 flex gap-3">
        <div className="flex-1 bg-black/60 backdrop-blur-md px-5 py-4 rounded-2xl flex items-center gap-3 border border-white/5 shadow-2xl">
           <svg className="w-5 h-5 text-amber-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
           <input type="text" placeholder={lang === 'zh' ? '搜尋靈域...' : lang === 'ja' ? '霊域を検索...' : 'Search domains...'} className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600 font-light" />
        </div>
        <button className="bg-black/60 backdrop-blur-md w-14 h-14 flex items-center justify-center rounded-2xl border border-white/5 active:scale-90 transition-transform">
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
        </button>
      </div>

      <div className="absolute top-28 right-6 flex flex-col gap-2">
         {[1,2,3,4,5].map(lv => (
           <div key={lv} className="w-8 h-8 rounded-full bg-black/40 border border-white/5 flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full ${RISK_COLORS[lv as any].replace('text-', 'bg-')}`}></div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default MapView;
