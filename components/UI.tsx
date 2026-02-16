
import React, { useState } from 'react';
import { RiskLevel, Property, SortOption } from '../types';
import { RISK_LEVEL_CONFIG } from '../constants';

export const calculateDiscount = (market: number, ghost: number): number => {
  if (market <= 0) return 0;
  return Math.round(((market - ghost) / market) * 100);
};

export const SortControls: React.FC<{ current: SortOption, onSort: (opt: SortOption) => void }> = ({ current, onSort }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-[10px] text-slate-500 font-black uppercase flex items-center mr-2">Sort By:</span>
      {[
        { id: 'date_new', label: '最新發布' },
        { id: 'price_asc', label: '價格(低到高)' },
        { id: 'price_desc', label: '價格(高到低)' },
        { id: 'level_asc', label: '事故最輕' },
        { id: 'roi_desc', label: '投報率最高' },
      ].map(opt => (
        <button
          key={opt.id}
          onClick={() => onSort(opt.id as SortOption)}
          className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${current === opt.id ? 'bg-amber-500 border-amber-400 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

// 圓環進度條組件
export const CircularProgress: React.FC<{ progress: number, size?: number }> = ({ progress, size = 120 }) => {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-slate-800"
        />
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          className="text-amber-500 transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black text-white">{progress}%</span>
        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Cleaned</span>
      </div>
    </div>
  );
};

// 事故等級標籤組件 (1-5)
export const AccidentBadge: React.FC<{ level: number }> = ({ level }) => {
  const configs: Record<number, { bg: string, text: string, icon: string, label: string }> = {
    1: { bg: 'bg-emerald-500/20 border-emerald-500', text: 'text-emerald-400', icon: '🍃', label: '平靜' },
    2: { bg: 'bg-blue-500/20 border-blue-500', text: 'text-blue-400', icon: '❄️', label: '微寒' },
    3: { bg: 'bg-yellow-500/20 border-yellow-500', text: 'text-yellow-400', icon: '☁️', label: '陰鬱' },
    4: { bg: 'bg-orange-500/20 border-orange-500', text: 'text-orange-400', icon: '🔥', label: '凶煞' },
    5: { bg: 'bg-red-500/20 border-red-500', text: 'text-red-400', icon: '💀', label: '極凶' },
  };

  const config = configs[level] || configs[1];

  return (
    <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${config.bg} ${config.text} backdrop-blur-md`}>
      <span className="text-sm">{config.icon}</span>
      <span className="text-[10px] font-black uppercase tracking-widest">Level {level} - {config.label}</span>
    </div>
  );
};

export const Badge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const config = RISK_LEVEL_CONFIG[level];
  return (
    <span className={`px-2 py-1 rounded text-[10px] font-bold border border-current ${config.color} bg-black/40 backdrop-blur-sm`}>
      {config.label}
    </span>
  );
};

export const PriceComparison: React.FC<{ property: Property }> = ({ property }) => {
  const currentUnit = Math.round(property.ghost_price / property.ping);
  const discountRate = calculateDiscount(property.district_avg_unit, currentUnit);
  
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2 text-white">
        📊 實價登錄對比
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">{property.district} 平均單價</p>
          <p className="text-2xl font-black text-white">{property.district_avg_unit} 萬/坪</p>
        </div>
        <div>
          <p className="text-[10px] text-amber-500 uppercase font-bold mb-1">本案成交單價</p>
          <p className="text-2xl font-black text-amber-500">{currentUnit} 萬/坪</p>
        </div>
      </div>
    </div>
  );
};

export const ROICalculator: React.FC<{ property: Property }> = ({ property }) => {
  const [renovate, setRenovate] = useState(100);
  const [expectedResale, setExpectedResale] = useState(property.market_price * 0.9);

  const cost = property.ghost_price + renovate;
  const profit = expectedResale - cost;
  const roi = ((profit / cost) * 100).toFixed(1);

  return (
    <div className="bg-slate-950 border border-amber-500/30 p-6 rounded-2xl space-y-4">
      <h3 className="text-lg font-bold text-amber-500">📈 投資收益試算 (ROI)</h3>
      <div className="space-y-3">
        <div>
          <label className="text-[10px] text-slate-500 uppercase block mb-1">預估翻修成本 (萬元)</label>
          <input 
            type="number" 
            value={renovate} 
            onChange={(e) => setRenovate(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-sm text-white focus:border-amber-500 outline-none"
          />
        </div>
        <div>
          <label className="text-[10px] text-slate-500 uppercase block mb-1">轉手目標價格 (萬元)</label>
          <input 
            type="number" 
            value={expectedResale} 
            onChange={(e) => setExpectedResale(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-sm text-white focus:border-amber-500 outline-none"
          />
        </div>
      </div>
      <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
        <div>
          <p className="text-[10px] text-slate-500 uppercase">預計投報率</p>
          <p className={`text-3xl font-black ${Number(roi) > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{roi}%</p>
        </div>
      </div>
    </div>
  );
};

export const Modal: React.FC<{ isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export const GhostCard = React.forwardRef<HTMLDivElement, { property: Property; active?: boolean; onClick: () => void }>(({ property, active, onClick }, ref) => (
  <div 
    ref={ref}
    onClick={onClick}
    className={`bg-slate-900/50 border ${active ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-800'} rounded-xl overflow-hidden hover:border-amber-500 transition-all cursor-pointer group mb-4`}
  >
    <div className="relative h-40 overflow-hidden">
      <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        <Badge level={property.riskLevel} />
      </div>
      <div className="absolute bottom-3 left-3 text-[8px] text-slate-400 font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded backdrop-blur">
        Published: {property.createdAt}
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-base font-bold group-hover:text-amber-500 truncate text-white">{property.title}</h3>
      <div className="mt-3 flex justify-between items-end">
        <span className="text-xs font-black text-white">NT$ {property.ghost_price}萬</span>
        <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-[10px] font-black">-{calculateDiscount(property.market_price, property.ghost_price)}%</span>
      </div>
    </div>
  </div>
));
