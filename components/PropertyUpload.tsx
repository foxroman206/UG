
import React, { useState } from 'react';

export const PropertyUpload: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black">刊登瑕疵物件</h2>
        <span className="bg-amber-500/10 text-amber-500 text-[10px] px-2 py-1 rounded font-black border border-amber-500/30">專業賣方模式</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">基本資訊</h3>
            <input placeholder="建案名稱 / 物件標題" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500 text-white" />
            <input placeholder="坪數 (Ping)" type="number" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500 text-white" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="開價 (萬)" type="number" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500 text-white" />
              <input placeholder="原行情 (萬)" type="number" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500 text-white" />
            </div>
            <textarea placeholder="事故簡述與屋況..." rows={4} className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500 text-white resize-none" />
          </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">影像上傳</h3>
           <div 
             className={`w-full aspect-square border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${dragActive ? 'bg-amber-500/10 border-amber-500' : 'bg-slate-900 border-slate-800'}`}
             onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
             onDragLeave={() => setDragActive(false)}
             onClick={() => alert('此為模擬上傳')}
           >
             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-3xl">📸</div>
             <div className="text-center">
               <p className="font-bold text-slate-300">拖放或點擊上傳</p>
               <p className="text-[10px] text-slate-600 mt-1 uppercase">Supports JPG, PNG (Max 10MB)</p>
             </div>
           </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-800 flex justify-end gap-4">
        <button className="px-8 py-3 bg-slate-800 text-white font-bold rounded-xl">儲存草稿</button>
        <button onClick={onSuccess} className="px-8 py-3 bg-amber-500 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20">刊登並支付探靈費</button>
      </div>
    </div>
  );
};
