
import React, { useState } from 'react';
import { MOCK_PROPERTIES, RISK_COLORS, TRANSLATIONS, TAIWAN_REGIONS } from '../constants';
import SoulFireRating from '../components/SoulFireRating';
import { Language } from '../types';

const Home: React.FC<{ onPropertyClick: (id: string) => void, lang: Language }> = ({ onPropertyClick, lang }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const filteredProperties = selectedRegion === 'all' 
    ? MOCK_PROPERTIES 
    : MOCK_PROPERTIES.filter(p => p.region === selectedRegion);

  const getRegionName = (key: string) => {
    if (key === 'all') return lang === 'zh' ? '全域搜尋' : 'Global Area';
    const all = [...TAIWAN_REGIONS.municipalities, ...TAIWAN_REGIONS.cities, ...TAIWAN_REGIONS.counties];
    return all.find(r => r.key === key)?.[lang] || key;
  };

  return (
    <div className="pb-32 relative">
      {/* HUD Background Scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[100]"></div>

      <header className="px-6 pt-16 pb-6">
        <h1 className="text-5xl font-serif italic mb-1 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-slate-200">GhostGuide</h1>
        <p className="text-slate-500 text-[10px] tracking-[0.5em] uppercase font-black">Agent Operation Center</p>
      </header>

      {/* Region Picker HUD */}
      <section className="px-6 mb-8">
        <div 
          onClick={() => setIsPickerOpen(!isPickerOpen)}
          className="metallic-glass p-5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="text-slate-600 text-[8px] uppercase font-black tracking-widest mb-1">Target Sector</h4>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 soul-fire"></span>
              <p className="text-lg font-serif italic text-slate-100">{getRegionName(selectedRegion)}</p>
            </div>
          </div>
          <svg className={`w-5 h-5 text-slate-600 transition-transform ${isPickerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth={3}/></svg>
        </div>

        {isPickerOpen && (
          <div className="mt-4 metallic-glass rounded-3xl border border-white/5 p-6 animate-in slide-in-from-top-4 duration-300 max-h-[60vh] overflow-y-auto">
            <button 
              onClick={() => { setSelectedRegion('all'); setIsPickerOpen(false); }}
              className={`w-full text-left py-2 px-4 rounded-xl mb-4 text-xs font-bold uppercase tracking-widest ${selectedRegion === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-500 hover:text-slate-200'}`}
            >
              All Regions
            </button>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-[10px] uppercase font-black text-slate-700 mb-3 tracking-widest border-b border-slate-900 pb-1">Special Municipalities (6)</h5>
                <div className="grid grid-cols-2 gap-2">
                  {TAIWAN_REGIONS.municipalities.map(r => (
                    <button key={r.key} onClick={() => { setSelectedRegion(r.key); setIsPickerOpen(false); }} className={`py-3 px-4 rounded-xl text-xs transition-all border ${selectedRegion === r.key ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'border-slate-800 text-slate-500'}`}>
                      {r[lang]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] uppercase font-black text-slate-700 mb-3 tracking-widest border-b border-slate-900 pb-1">Major Cities (3)</h5>
                <div className="grid grid-cols-2 gap-2">
                  {TAIWAN_REGIONS.cities.map(r => (
                    <button key={r.key} onClick={() => { setSelectedRegion(r.key); setIsPickerOpen(false); }} className={`py-3 px-4 rounded-xl text-xs transition-all border ${selectedRegion === r.key ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'border-slate-800 text-slate-500'}`}>
                      {r[lang]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] uppercase font-black text-slate-700 mb-3 tracking-widest border-b border-slate-900 pb-1">Counties (13)</h5>
                <div className="grid grid-cols-2 gap-2">
                  {TAIWAN_REGIONS.counties.map(r => (
                    <button key={r.key} onClick={() => { setSelectedRegion(r.key); setIsPickerOpen(false); }} className={`py-3 px-4 rounded-xl text-xs transition-all border ${selectedRegion === r.key ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'border-slate-800 text-slate-500'}`}>
                      {r[lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quest Board Content */}
      <section className="px-6 mb-8">
        <div className="flex justify-between items-end mb-6 border-b border-slate-900 pb-3">
           <h2 className="text-xl font-serif italic text-slate-200">{t.discover}</h2>
           <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Active Quests: {filteredProperties.length}</span>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="space-y-8">
            {filteredProperties.map((prop) => (
              <div 
                key={prop.id} 
                onClick={() => onPropertyClick(prop.id)}
                className="group relative bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800/50 hover:border-amber-500/30 hover:bg-slate-900/60 transition-all duration-700 cursor-pointer shadow-xl"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img src={prop.imageUrl} className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={prop.title[lang]} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md bg-black/80 border border-white/10 ${RISK_COLORS[prop.riskLevel]}`}>
                      {t.labels[prop.riskLevel]}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl text-slate-100 group-hover:text-amber-500 transition-colors">{prop.title[lang]}</h3>
                    <div className="text-right">
                      <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest">{t.roi}</p>
                      <p className="text-xl font-serif text-amber-500">+{prop.roi}%</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-6">{prop.address[lang]}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-slate-800/30">
                    <SoulFireRating level={prop.riskLevel} size="sm" />
                    <p className="text-2xl font-black text-slate-100 tracking-tighter">${(prop.price / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center opacity-30">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            <p className="font-serif italic">Sector clear of anomalies.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
