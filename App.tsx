
import React, { useState } from 'react';
import Home from './pages/Home';
import MapView from './pages/Map';
import Upload from './pages/Upload';
import PropertyDetail from './pages/PropertyDetail';
import Login from './pages/Login';
import { MOCK_PROPERTIES, TRANSLATIONS } from './constants';
import { Language, User } from './types';

type Page = 'login' | 'discovery' | 'map' | 'upload' | 'profile' | 'detail';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [lang, setLang] = useState<Language>('zh');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    id: '0',
    name: 'Ghost Hunter',
    level: 1,
    exp: 0,
    isLoggedIn: false
  });

  const t = TRANSLATIONS[lang];

  const navigateToDetail = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentPage('detail');
  };

  const handleLogin = () => {
    setUser({ ...user, isLoggedIn: true });
    setCurrentPage('discovery');
  };

  const renderPage = () => {
    if (!user.isLoggedIn && currentPage !== 'login') {
      return <Login lang={lang} onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'login':
        return <Login lang={lang} onLogin={handleLogin} />;
      case 'discovery':
        return <Home onPropertyClick={navigateToDetail} lang={lang} />;
      case 'map':
        return <MapView onPropertyClick={navigateToDetail} lang={lang} />;
      case 'upload':
        return <Upload lang={lang} />;
      case 'detail':
        const prop = MOCK_PROPERTIES.find(p => p.id === selectedPropertyId);
        return prop ? <PropertyDetail property={prop} onBack={() => setCurrentPage('discovery')} lang={lang} /> : <Home onPropertyClick={navigateToDetail} lang={lang} />;
      case 'profile':
        return (
          <div className="flex flex-col items-center justify-center h-screen text-slate-500 italic px-12 text-center bg-black/40">
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-amber-500 flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <svg className="w-12 h-12 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 5a3 3 0 110 6 3 3 0 010-6zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black">LV.{user.level}</div>
            </div>
            <p className="font-serif italic text-2xl text-slate-200 mb-2">Spectral Analyst v1.0</p>
            <p className="text-[10px] uppercase font-bold tracking-[0.4em] mb-8 text-slate-500">ID: HUNTER_6692</p>
            
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-12 border border-white/5">
              <div className="bg-amber-500 h-full w-1/3 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
            </div>

            <button 
              onClick={() => setUser({ ...user, isLoggedIn: false, level: 1 })}
              className="text-xs text-red-500 font-bold uppercase tracking-widest hover:text-red-400 transition-colors border-b border-red-500/20 pb-1"
            >
              Sign Out Agent
            </button>
          </div>
        );
      default:
        return <Home onPropertyClick={navigateToDetail} lang={lang} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-950 min-h-screen relative shadow-[0_0_100px_rgba(0,0,0,0.8)] border-x border-slate-900/50 overflow-x-hidden">
      {/* HUD Header for Language Switcher */}
      {(currentPage !== 'detail' && currentPage !== 'login') && (
         <div className="fixed top-0 max-w-md mx-auto inset-x-0 p-4 z-[60] flex justify-end">
            <div className="metallic-glass px-2 py-1 rounded-full flex gap-1 border border-white/5">
                {(['zh', 'ja', 'en'] as Language[]).map(l => (
                  <button key={l} onClick={() => setLang(l)} className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all uppercase ${lang === l ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-slate-500'}`}>{l}</button>
                ))}
            </div>
         </div>
      )}

      {renderPage()}
      
      {/* Gaming Style HUD Navigation */}
      {currentPage !== 'login' && (
        <nav className="fixed bottom-0 inset-x-0 max-w-md mx-auto metallic-glass border-t border-white/10 px-8 py-3 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <button onClick={() => setCurrentPage('discovery')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${currentPage === 'discovery' ? 'text-amber-500 scale-110' : 'text-slate-500 opacity-60'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span className="text-[10px] uppercase font-black tracking-tighter">{t.discover}</span>
          </button>
          <button onClick={() => setCurrentPage('map')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${currentPage === 'map' ? 'text-amber-500 scale-110' : 'text-slate-500 opacity-60'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
            <span className="text-[10px] uppercase font-black tracking-tighter">{t.map}</span>
          </button>
          <div className="relative -top-10 group">
            <button onClick={() => setCurrentPage('upload')} className={`w-14 h-14 rounded-full bg-slate-50 text-slate-950 flex items-center justify-center shadow-2xl border-4 border-slate-950 transition-all duration-500 ${currentPage === 'upload' ? 'rotate-45 scale-125 bg-amber-500' : ''}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
            </button>
          </div>
          <button onClick={() => setCurrentPage('profile')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${currentPage === 'profile' ? 'text-amber-500 scale-110' : 'text-slate-500 opacity-60'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            <span className="text-[10px] uppercase font-black tracking-tighter">{t.profile}</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
