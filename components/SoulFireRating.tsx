import React from 'react';
import { RiskLevel } from '../types';
import { RISK_COLORS } from '../constants';

interface SoulFireRatingProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

const SoulFireRating: React.FC<SoulFireRatingProps> = ({ level, size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-7 h-7';
  const colorClass = RISK_COLORS[level] || 'text-slate-500';
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`${iconSize} ${s <= level ? colorClass + ' soul-fire' : 'text-slate-800'} transition-all duration-500`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2c0 0-4 4.5-4 9.5s4 7.5 4 7.5 4-2.5 4-7.5S12 2 12 2zm0 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM12 22s5-3 5-7.5c0-3-2-5.5-5-5.5s-5 2.5-5 5.5c0 4.5 5 7.5 5 7.5z" />
        </svg>
      ))}
    </div>
  );
};

export default SoulFireRating;