
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GloomLogo } from './components/GloomLogo';
import { MOCK_PROPERTIES, MOCK_BADGES, MOCK_PROJECTS, TRANSLATIONS, RISK_LEVEL_CONFIG } from './constants';
import { Property, RiskLevel, Language, UserState, UserRole, Project, SortOption } from './types';
import { GhostCard, Badge as RiskBadge, calculateDiscount, PriceComparison, ROICalculator, Modal, CircularProgress, AccidentBadge, SortControls } from './components/UI';
import { LegalGuide } from './components/Overseas/LegalGuide';
import { MapSection } from './components/MapSection';
import { LegalChecklist } from './components/LegalChecklist';
import { LoginView } from './components/Login';
import { PropertyUpload } from './components/PropertyUpload';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh-TW');
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'details' | 'dashboard' | 'overseas' | 'login' | 'upload' | 'projects' | 'project_detail'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [serviceType, setServiceType] = useState<'cleaner' | 'cert'>('cleaner');
  const [sortOption, setSortOption] = useState<SortOption>('date_new');
  
  const [user, setUser] = useState<UserState>({
    level: 1,
    exp: 20,
    rankName: '遊魂',
    badges: MOCK_BADGES,
    profile: { 
      isLoggedIn: false, 
      name: '', 
      email: '', 
      provider: 'google', 
      role: 'USER', 
      bravery_level: 15,
      verification_status: 'UNVERIFIED'
    }
  });

  const propertyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const t = TRANSLATIONS[lang];

  // 排序邏輯
  const sortedProperties = useMemo(() => {
    let list = [...MOCK_PROPERTIES];
    switch(sortOption) {
      case 'price_asc': list.sort((a, b) => a.ghost_price - b.ghost_price); break;
      case 'price_desc': list.sort((a, b) => b.ghost_price - a.ghost_price); break;
      case 'date_new': list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'level_asc': list.sort((a, b) => a.accident_level - b.accident_level); break;
      case 'roi_desc': 
        list.sort((a, b) => {
          const roiA = (a.market_price * 0.9 - (a.ghost_price + 100)) / (a.ghost_price + 100);
          const roiB = (b.market_price * 0.9 - (b.ghost_price + 100)) / (b.ghost_price + 100);
          return roiB - roiA;
        });
        break;
    }
    return list;
  }, [sortOption]);

  const handlePropertyClick = (p: Property) => {
    setSelectedProperty({
      ...p,
      purification_progress: p.id === '1' ? 75 : 0 // 模擬數據
    });
    setCurrentPage('details');
    window.scrollTo(0, 0);
  };

  const handleProjectClick = (prj: Project) => {
    setSelectedProject(prj);
    setCurrentPage('project_detail');
    window.scrollTo(0, 0);
  };

  const handleLogin = (provider: any) => {
    setUser({
      ...user,
      profile: { 
        isLoggedIn: true, 
        name: '探靈家 007', 
        email: 'agent@ghostly.com', 
        provider, 
        role: 'AGENT',
        bravery_level: 88,
        verification_status: 'VERIFIED'
      }
    });
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser({ ...user, profile: { ...user.profile!, isLoggedIn: false } });
    setCurrentPage('home');
  };

  const handleMarkerClick = (id: string) => {
    setActivePropertyId(id);
    propertyRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const getPropertiesInProject = (prjId: string) => {
    return MOCK_PROPERTIES.filter(p => p.projectId === prjId);
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-200">
      {/* 導航欄 */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => setCurrentPage('home')}>
          <GloomLogo />
        </div>
        
        <div className="hidden md:flex gap-8 font-bold text-sm">
          <button onClick={() => setCurrentPage('search')} className="hover:text-amber-500 transition-colors">物件搜索</button>
          <button onClick={() => setCurrentPage('projects')} className="hover:text-amber-500 transition-colors">建案資料庫</button>
          {user.profile?.role === 'AGENT' && (
            <button onClick={() => setCurrentPage('upload')} className="hover:text-amber-500 transition-colors">物件管理</button>
          )}
          <button className="hover:text-amber-500 transition-colors">我的收藏</button>
        </div>

        <div className="flex items-center gap-4">
          {!user.profile?.isLoggedIn ? (
            <button onClick={() => setCurrentPage('login')} className="bg-amber-500 text-slate-950 px-4 py-1.5 rounded-lg font-bold text-sm">登入探靈</button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end leading-none hidden sm:flex">
                <span className="text-xs font-black text-white">{user.profile.name}</span>
                <span className="text-[8px] text-amber-500 uppercase tracking-widest mt-1">{user.profile.role}</span>
              </div>
              <div className="group relative">
                <div onClick={() => setCurrentPage('dashboard')} className="w-10 h-10 rounded-full border-2 border-amber-500 overflow-hidden cursor-pointer">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" />
                </div>
                <div className="absolute right-0 top-12 w-48 bg-slate-900 border border-slate-800 rounded-xl hidden group-hover:block overflow-hidden shadow-2xl">
                  <button onClick={() => setCurrentPage('dashboard')} className="w-full text-left px-4 py-3 text-xs hover:bg-slate-800 border-b border-slate-800">個人主頁</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-xs hover:bg-red-500/10 text-red-500">登出系統</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-6 py-8">
        {currentPage === 'login' && <LoginView onLogin={handleLogin} />}
        {currentPage === 'upload' && <PropertyUpload onSuccess={() => setCurrentPage('search')} />}

        {currentPage === 'home' && (
          <div className="space-y-16">
            <section className="relative py-20 text-center">
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">直視瑕疵，掌握行情</h1>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">整合全台凶宅資訊與建案討論，為您提供最真實的房地產心理瑕疵評估。</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setCurrentPage('search')} className="bg-amber-500 text-slate-950 px-8 py-3 rounded-xl font-black shadow-lg shadow-amber-500/30 hover:scale-105 transition-all uppercase tracking-widest">開始搜索凶宅</button>
                <button onClick={() => setCurrentPage('projects')} className="bg-slate-800 text-white px-8 py-3 rounded-xl font-black border border-slate-700 hover:bg-slate-700 transition-all uppercase tracking-widest">瀏覽建案庫</button>
              </div>
            </section>
            
            <section>
              <h2 className="text-3xl font-bold mb-8">最新入庫物件</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MOCK_PROPERTIES.map(p => <GhostCard key={p.id} property={p} onClick={() => handlePropertyClick(p)} />)}
              </div>
            </section>
          </div>
        )}

        {currentPage === 'search' && (
          <div className="h-[calc(100vh-140px)] flex flex-col">
            <SortControls current={sortOption} onSort={setSortOption} />
            <div className="flex gap-6 h-full overflow-hidden">
              <div className="w-1/3 overflow-y-auto pr-2 custom-scrollbar">
                {sortedProperties.map(p => <GhostCard key={p.id} ref={el => { propertyRefs.current[p.id] = el; }} property={p} onClick={() => handlePropertyClick(p)} />)}
              </div>
              <div className="flex-grow">
                <MapSection properties={sortedProperties} activeId={activePropertyId} onMarkerClick={handleMarkerClick} />
              </div>
            </div>
          </div>
        )}

        {currentPage === 'projects' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black">🏢 建案資料庫</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_PROJECTS.map(prj => (
                <div key={prj.id} onClick={() => handleProjectClick(prj)} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer hover:border-amber-500 transition-all group">
                  <div className="h-48 overflow-hidden">
                    <img src={prj.image} alt={prj.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{prj.name}</h3>
                    <p className="text-xs text-slate-500 mb-4 truncate">📍 {prj.address}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded font-black border border-amber-500/20">{getPropertiesInProject(prj.id).length} 筆凶宅物件</span>
                      <span className="text-[10px] text-slate-500 uppercase font-black">{prj.discussions.length} 則討論</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'project_detail' && selectedProject && (
          <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <div className="relative rounded-3xl overflow-hidden h-64 border border-slate-800">
                  <img src={selectedProject.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <h1 className="text-4xl font-black text-white mb-2">{selectedProject.name}</h1>
                    <p className="text-slate-400">📍 {selectedProject.address}</p>
                  </div>
                </div>

                <section className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-6">關於此建案</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.description}</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-6">🏠 此建案包含之凶宅標的</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {getPropertiesInProject(selectedProject.id).map(p => (
                      <GhostCard key={p.id} property={p} onClick={() => handlePropertyClick(p)} />
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="text-amber-500">💬</span> 探靈討論串
                  </h3>
                  <div className="space-y-4">
                    {selectedProject.discussions.map(d => (
                      <div key={d.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-black text-amber-500">{d.author}</span>
                          <span className="text-[8px] text-slate-600 font-bold uppercase">{d.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{d.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <textarea placeholder="對此建案有何觀察？" className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-white outline-none focus:border-amber-500 resize-none" rows={3} />
                    <button className="w-full mt-3 py-2 bg-amber-500 text-slate-950 text-[10px] font-black rounded-lg uppercase tracking-widest">發表討論</button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'details' && selectedProperty && (
          <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                  <img src={selectedProperty.image} className="w-full aspect-video object-cover" />
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <AccidentBadge level={selectedProperty.accident_level} />
                  </div>
                  {selectedProperty.projectId && (
                    <button 
                      onClick={() => {
                        const prj = MOCK_PROJECTS.find(pj => pj.id === selectedProperty.projectId);
                        if (prj) handleProjectClick(prj);
                      }}
                      className="absolute bottom-6 left-6 bg-slate-950/80 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold border border-slate-800 hover:border-amber-500 transition-all text-amber-500"
                    >
                      🏢 查看建案專頁
                    </button>
                  )}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-2 h-6 bg-amber-500 rounded-full" />
                    物件專業服務進度
                  </h3>
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="flex items-center gap-8">
                      <CircularProgress progress={selectedProperty.purification_progress || 0} />
                      <div>
                        <h4 className="font-bold text-lg">洗屋師進駐期</h4>
                        <p className="text-xs text-slate-500 mt-2">目前由「資深洗屋師」進行安定進駐中，預計剩餘 3 個月達成洗白標準。</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <button onClick={() => setIsServiceModalOpen(true)} className="w-full py-4 border border-amber-500 text-amber-500 rounded-xl font-bold hover:bg-amber-500/10 transition-all">
                        聯絡委任法師
                      </button>
                      <button onClick={() => setIsLoanModalOpen(true)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                        🏦 凶宅專屬貸款諮詢
                      </button>
                    </div>
                  </div>
                </div>

                <LegalChecklist property={selectedProperty} />
              </div>

              <div className="space-y-8">
                <PriceComparison property={selectedProperty} />
                <ROICalculator property={selectedProperty} />
              </div>
            </div>
          </div>
        )}

        {currentPage === 'dashboard' && (
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex items-center gap-8">
                <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20">👻</div>
                <div>
                   <h2 className="text-3xl font-black">{user.profile?.name || '匿名探靈家'}</h2>
                   <p className="text-slate-500 text-sm">{user.profile?.email}</p>
                   <div className="mt-2 flex gap-2">
                      <span className="bg-slate-800 text-[10px] px-2 py-1 rounded font-bold border border-slate-700 uppercase">{user.profile?.role} Auth</span>
                      <span className="bg-amber-500/10 text-amber-500 text-[10px] px-2 py-1 rounded font-bold border border-amber-500/30 uppercase">Bravery: {user.profile?.bravery_level}</span>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>

      <Modal isOpen={isLoanModalOpen} onClose={() => setIsLoanModalOpen(false)} title="凶宅專案貸款諮詢">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('諮詢已送出，專員將在 24 小時內與您聯繫'); setIsLoanModalOpen(false); }}>
          <p className="text-xs text-slate-400">由於標的具備心理瑕疵，我們將透過配合之特約銀行評估貸放成數（預計 4-6 成）。</p>
          <div className="space-y-3">
            <input required placeholder="您的姓名" className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500 text-sm" />
            <input required type="tel" placeholder="手機電話" className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500 text-sm" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-xl shadow-blue-500/20">送出申請</button>
        </form>
      </Modal>

      <footer className="bg-slate-950 border-t border-slate-800 px-6 py-12 text-center text-[10px] text-slate-700 uppercase tracking-widest font-black">
        &copy; 2024 Hauntly Professional System | Ghostly Real Estate Logic
      </footer>
    </div>
  );
};

export default App;