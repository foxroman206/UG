
import React from 'react';
import { Property } from '../types';

export const LegalChecklist: React.FC<{ property: Property }> = ({ property }) => {
  const items = [
    { label: '事故發生於專有部分', checked: property.is_exclusive_part, desc: '依內政部函釋，專有部分之事故需揭露。' },
    { label: '於賣方持有期間發生', checked: property.happened_during_ownership, desc: '賣方持有期間發生之事故為絕對揭露義務。' },
    { label: '具備現況說明書', checked: property.has_disclosure_doc, desc: '已於不動產標的現況說明書中誠實勾選。' },
    { label: '鄰近公設區域事故', checked: !property.is_exclusive_part, desc: '發生於頂樓平台或中庭等公設（不在此限）。' }
  ];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">⚖️ 內政部規範揭露清單</h3>
        <span className="text-[10px] text-slate-500 font-black border border-slate-700 px-2 py-1 rounded uppercase tracking-tighter">MOI Standard</span>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start group">
            <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.checked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700 bg-slate-950 text-transparent'}`}>
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
            </div>
            <div>
              <p className={`text-sm font-bold ${item.checked ? 'text-white' : 'text-slate-500'}`}>{item.label}</p>
              <p className="text-[10px] text-slate-600 leading-relaxed mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-800">
        <p className="text-[9px] text-red-700 leading-tight italic">
          * 註：依中華民國 111 年最新函釋，房屋洗白（轉手後再售）雖非絕對揭露義務，但基於誠實信用原則建議告知。
        </p>
      </div>
    </div>
  );
};
