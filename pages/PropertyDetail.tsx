
import React, { useState, useEffect } from 'react';
import { Property, RiskAnalysis, Language } from '../types';
import { RISK_COLORS, TRANSLATIONS } from '../constants';
import SoulFireRating from '../components/SoulFireRating';
import PurificationSlider from '../components/PurificationSlider';
import { analyzePropertyIncident, chatWithPsychic } from '../services/geminiService';

const PropertyDetail: React.FC<{ property: Property, onBack: () => void, lang: Language }> = ({ property, onBack, lang }) => {
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isChatting, setIsChatting] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsAnalyzing(true);
      try {
        const result = await analyzePropertyIncident(property.description[lang]);
        setAnalysis(result);
      } catch (e) {
        console.error(e);
      } finally {
        setIsAnalyzing(false);
      }
    };
    fetchAnalysis();
  }, [property.description, lang]);

  const handleAskPsychic = async () => {
    if (!chatMessage.trim()) return;
    setIsChatting(true);
    const res = await chatWithPsychic(chatMessage, property.incidentType[lang]);
    setChatResponse(res || null);
    setIsChatting(false);
  };

  return (
    <div className="bg-slate-950 min-h-screen pb-40 relative animate-in fade-in duration-500">
      {/* Background HUD Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>

      <div className="relative">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 z-30 metallic-glass w-10 h-10 flex items-center justify-center rounded-full border border-white/20 active:scale-90 transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <PurificationSlider originalUrl={property.imageUrl} purifiedUrl={property.purifiedImageUrl} />
      </div>

      <div className="px-6 pt-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
               <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${RISK_COLORS[property.riskLevel]}`}>
                {t.labels[property.riskLevel]}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Asset #{property.id}</span>
            </div>
            <h1 className="text-4xl font-serif italic mb-2 text-slate-100">{property.title[lang]}</h1>
            <div className="flex items-center gap-2 text-slate-500">
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               <p className="text-xs uppercase font-bold tracking-widest">{property.address[lang]}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-amber-500 tracking-tighter">${(property.price / 1000000).toFixed(1)}M</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.roi} +{property.roi}%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-slate-900/40 border border-slate-800/50 p-4 rounded-3xl text-center backdrop-blur-sm">
            <p className="text-[10px] uppercase text-slate-500 font-black tracking-widest mb-2">{t.risk}</p>
            <div className="flex justify-center"><SoulFireRating level={property.riskLevel} size="sm" /></div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/50 p-4 rounded-3xl text-center backdrop-blur-sm">
            <p className="text-[10px] uppercase text-slate-500 font-black tracking-widest mb-2">{t.daysSilent}</p>
            <p className="text-xl font-serif text-slate-100">{property.daysSinceIncident}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/50 p-4 rounded-3xl text-center backdrop-blur-sm">
            <p className="text-[10px] uppercase text-slate-500 font-black tracking-widest mb-2">{t.area}</p>
            <p className="text-xl font-serif text-emerald-400">{property.area} m²</p>
          </div>
        </div>

        {/* AI Investigation Panel */}
        <section className="mb-10 overflow-hidden rounded-[2rem] border border-amber-500/20 bg-slate-900/30 backdrop-blur-md relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
          </div>
          <div className="bg-amber-500/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 soul-fire"></span>
              Ethereal Appraisal Report
            </h2>
            {isAnalyzing && <div className="animate-spin h-3 w-3 border-2 border-amber-500 border-t-transparent rounded-full"></div>}
          </div>
          <div className="p-8 space-y-6">
            {analysis ? (
              <>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[1px] before:bg-amber-500/50">
                  <h4 className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">Psychic Verdict</h4>
                  <p className="text-sm leading-relaxed text-slate-300 font-serif italic">"{analysis.reason}"</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">Spiritual Impact</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{analysis.psychologicalImpact}</p>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">Market Potency</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{analysis.investmentAdvice}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-10 text-center">
                <div className="inline-block animate-pulse mb-2 text-slate-600">
                   <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{t.loading}</p>
              </div>
            )}
          </div>
        </section>

        {/* Oracle Chatbot */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-4">
             <h2 className="text-2xl font-serif italic text-slate-200">{t.oracle}</h2>
             <span className="h-[1px] flex-1 bg-slate-900"></span>
          </div>
          <div className="metallic-glass p-1 rounded-[2rem] border border-white/5">
            <div className="bg-black/40 p-6 rounded-[1.9rem] space-y-4">
              <div className="relative group">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={t.ask} 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-6 pr-16 text-sm outline-none focus:border-amber-500/50 transition-all font-light"
                  onKeyDown={(e) => e.key === 'Enter' && handleAskPsychic()}
                />
                <button 
                  onClick={handleAskPsychic}
                  disabled={isChatting}
                  className="absolute right-2 top-2 bottom-2 w-12 flex items-center justify-center bg-amber-500 rounded-xl text-slate-950 hover:bg-amber-400 transition-all disabled:opacity-50 active:scale-90"
                >
                  {isChatting ? <div className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full"></div> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth={3}/></svg>}
                </button>
              </div>
              {chatResponse && (
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/5 text-slate-300 text-sm leading-relaxed animate-in fade-in slide-in-from-top-4 duration-700 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/30"></div>
                   <div className="flex items-center gap-2 mb-3 text-amber-500/80">
                      <div className="w-4 h-4 rounded-full border border-amber-500/50 flex items-center justify-center text-[8px] font-black">O</div>
                      <span className="text-[9px] uppercase font-black tracking-widest">Oracle Response</span>
                   </div>
                   <p className="font-light italic">{chatResponse}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Persistent CTA Button - Gaming Style */}
      <div className="fixed bottom-0 inset-x-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-[60]">
        <button className="w-full group relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-500 transition-all duration-500 group-hover:scale-110"></div>
          <div className="relative px-8 py-5 bg-transparent text-slate-950 font-black tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-[0_20px_50px_rgba(245,158,11,0.3)]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/></svg>
            {t.investigate}
          </div>
        </button>
      </div>
    </div>
  );
};

export default PropertyDetail;
