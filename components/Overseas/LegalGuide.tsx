
import React from 'react';

export const LegalGuide: React.FC = () => (
  <div className="bg-blue-950/20 border border-blue-900/50 rounded-2xl p-6 mb-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl">🌍</div>
      <div>
        <h2 className="text-2xl font-bold">Overseas Buyer Guide / 海外買家專區</h2>
        <p className="text-blue-400 text-sm">Legal framework for foreign investment in Taiwan real estate.</p>
      </div>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-b border-blue-800 pb-2">📜 Key Regulations</h3>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex gap-2">
            <span className="text-blue-500">▶</span>
            <span><strong>Reciprocity Principle:</strong> Your home country must allow Taiwanese to buy land.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500">▶</span>
            <span><strong>Prohibited Lands:</strong> Agricultural, forest, and national security zones are strictly forbidden.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500">▶</span>
            <span><strong>Approval Process:</strong> All acquisitions require prior approval from the Ministry of Interior.</span>
          </li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-b border-blue-800 pb-2">📍 Purchase Types</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-xs text-blue-400 font-bold uppercase mb-1">Foreigners</p>
            <p className="text-xs">Residential permitted with MOI approval.</p>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-xs text-blue-400 font-bold uppercase mb-1">Compatriots</p>
            <p className="text-xs">Limit 1 hectare for residential use.</p>
          </div>
        </div>
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-bold text-sm">
          Download Process Flowchart (PDF)
        </button>
      </div>
    </div>
  </div>
);
