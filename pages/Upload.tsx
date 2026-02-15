
import React, { useState } from 'react';
import { analyzePropertyIncident } from '../services/geminiService';
import SoulFireRating from '../components/SoulFireRating';
import { RiskLevel, Language } from '../types';
import { TRANSLATIONS } from '../constants';

const Upload: React.FC<{ lang: Language }> = ({ lang }) => {
  const [description, setDescription] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);
  const [suggestion, setSuggestion] = useState<{rating: number, reason: string} | null>(null);

  const t = TRANSLATIONS[lang];

  const handleClassify = async () => {
    if (description.length < 10) return;
    setIsClassifying(true);
    try {
      const result = await analyzePropertyIncident(description);
      setSuggestion({ rating: result.rating, reason: result.reason });
    } catch (e) {
      console.error(e);
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <div className="pb-40 px-6 pt-16 relative">
       <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
       </div>

      <h1 className="text-4xl font-serif italic mb-2 text-slate-100">{t.upload}</h1>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-10">Domain Appraisal Protocol</p>

      <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">Incident Narrative</label>
            <span className="text-[8px] text-slate-700 font-bold uppercase">Field: Lore_Input</span>
          </div>
          <div className="relative group">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={lang === 'zh' ? '請詳述事故過程...' : lang === 'ja' ? '事故事例を詳しく記述してください...' : 'Describe the event...'}
              className="w-full min-h-[180px] bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 text-sm focus:border-amber-500/50 outline-none transition-all placeholder:text-slate-700 font-light leading-relaxed"
            />
            <button 
              type="button"
              onClick={handleClassify}
              disabled={isClassifying || description.length < 10}
              className="absolute bottom-5 right-5 bg-slate-800/80 backdrop-blur-md text-amber-500 px-5 py-2.5 rounded-2xl text-[10px] font-black border border-amber-500/20 hover:bg-amber-500 hover:text-slate-950 transition-all disabled:opacity-30 active:scale-95 uppercase tracking-widest"
            >
              {isClassifying ? 'Analyzing Lore...' : 'AI Appraisal'}
            </button>
          </div>
        </div>

        {suggestion && (
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-950 p-8 rounded-[2.5rem] border border-amber-500/20 animate-in zoom-in-95 duration-500 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c0 0-4 4.5-4 9.5s4 7.5 4 7.5 4-2.5 4-7.5S12 2 12 2z"/></svg>
            </div>
            <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center justify-between">
              Appraisal Result
              <span className="text-slate-600 font-bold text-[8px]">Confidence 98.4%</span>
            </h4>
            <div className="flex items-center gap-5 mb-5">
              <SoulFireRating level={suggestion.rating as RiskLevel} size="lg" />
              <div className="h-8 w-[1px] bg-white/5"></div>
              <span className="text-2xl font-serif italic text-slate-100">Level {suggestion.rating}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic font-light">"{suggestion.reason}"</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 ml-2">{t.price}</label>
            <div className="relative">
              <input type="number" placeholder="45.0M" className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-amber-500/50 transition-all font-light" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-700 font-black">TWD</span>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 ml-2">{t.area}</label>
            <div className="relative">
              <input type="number" placeholder="45.5" className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-amber-500/50 transition-all font-light" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-700 font-black">m²</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 ml-2">Lore Documentation</label>
          <div className="group border-2 border-dashed border-slate-800 rounded-[2.5rem] p-12 text-center hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all cursor-pointer bg-slate-900/20">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800 group-hover:scale-110 transition-transform shadow-xl">
               <svg className="w-8 h-8 text-slate-600 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Upload Spectral Proof</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-tighter">News/Legal/Medical Records</p>
            <input type="file" className="hidden" />
          </div>
        </div>

        <button className="w-full relative group overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-amber-500 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative py-6 text-slate-950 font-black tracking-[0.3em] uppercase text-sm active:scale-95 transition-transform flex items-center justify-center gap-2">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
             {t.appraisal}
          </div>
        </button>
      </form>
    </div>
  );
};

export default Upload;
