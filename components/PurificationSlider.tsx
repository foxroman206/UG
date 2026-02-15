
import React, { useState } from 'react';

interface PurificationSliderProps {
  originalUrl: string;
  purifiedUrl: string;
}

const PurificationSlider: React.FC<PurificationSliderProps> = ({ originalUrl, purifiedUrl }) => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-800">
      <img src={purifiedUrl} className="absolute inset-0 w-full h-full object-cover" alt="Purified" />
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden" 
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={originalUrl} className="w-full h-full object-cover" alt="Original" />
        <div className="absolute top-4 left-4 bg-slate-900/80 px-2 py-1 text-xs rounded border border-white/20 uppercase tracking-widest font-bold">
          Original
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-amber-500/80 px-2 py-1 text-xs rounded border border-white/20 uppercase tracking-widest font-bold text-slate-950">
        AI Purified
      </div>
      
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
      
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur shadow-xl z-10 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-slate-900">
          <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7l-5 5m0 0l5 5m-5-5h18m-5-5l5 5m0 0l-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PurificationSlider;
