
import React from 'react';
import { Property } from '../types';

interface MapProps {
  properties: Property[];
  activeId: string | null;
  onMarkerClick: (id: string) => void;
}

export const MapSection: React.FC<MapProps> = ({ properties, activeId, onMarkerClick }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden rounded-2xl border border-slate-800">
      {/* Simulation of a Map using an SVG/Styled container for the demo */}
      <div className="absolute inset-0 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png')] bg-cover opacity-30 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 600">
          {/* Simulated grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Simulated markers based on coordinates scaled to viewport */}
          {properties.map(p => {
             // Mock projection of lat/lng to 1000x600 grid for demo purposes
             const x = ((p.lng - 120) * 500) % 800 + 100;
             const y = ((26 - p.lat) * 200) % 400 + 100;
             const isActive = activeId === p.id;
             
             return (
               <g 
                 key={p.id} 
                 className="cursor-pointer group" 
                 onClick={() => onMarkerClick(p.id)}
               >
                 <circle 
                   cx={x} 
                   cy={y} 
                   r={isActive ? 12 : 8} 
                   className={`${isActive ? 'fill-amber-500 animate-pulse' : 'fill-slate-800'} stroke-amber-500 stroke-2 transition-all duration-300`} 
                 />
                 <text 
                   x={x} 
                   y={y - 15} 
                   textAnchor="middle" 
                   className={`${isActive ? 'fill-amber-500 text-[12px] font-black' : 'fill-slate-500 text-[10px]'} pointer-events-none transition-all`}
                 >
                   NT${p.ghost_price}萬
                 </text>
                 <circle 
                   cx={x} 
                   cy={y} 
                   r={30} 
                   fill="transparent" 
                   className="hover:fill-amber-500/10 transition-colors"
                 />
               </g>
             );
          })}
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        Live Haunted Map View v1.0
      </div>
    </div>
  );
};
