
import React from 'react';
import { RiskLevel } from '../types';
import { RISK_COLORS } from '../constants';

interface StarRatingProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: React.FC<StarRatingProps> = ({ level, size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6';
  const colorClass = RISK_COLORS[level] || 'text-slate-500';

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`${iconSize} ${s <= level ? colorClass : 'text-slate-700'} transition-colors duration-300`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
