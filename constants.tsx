
import { RiskLevel, Property, Badge, Project } from './types';

export const COLORS = {
  bg_dark: '#020617',
  bg_card: '#0f172a',
  ghost_gold: '#f59e0b',
  blood_red: '#ef4444',
  text_main: '#f8fafc',
  text_dim: '#94a3b8'
};

export const RISK_LEVEL_CONFIG = {
  [RiskLevel.NONE]: { label: '無風無浪', color: 'text-blue-400', score: '0–19' },
  [RiskLevel.SLIGHT]: { label: '輕微陰氣', color: 'text-green-400', score: '20–39' },
  [RiskLevel.CHILLY]: { label: '陰風陣陣', color: 'text-yellow-400', score: '40–59' },
  [RiskLevel.RESENTFUL]: { label: '怨氣沖天', color: 'text-orange-500', score: '60–79' },
  [RiskLevel.BLOOD]: { label: '血光之災', color: 'text-red-500', score: '80–94' },
  [RiskLevel.EXTREME]: { label: '極度恐怖', color: 'text-red-700', score: '95–100' },
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'prj1',
    name: '錦新大樓',
    address: '台北市中山區新生北路二段',
    description: '台北市知名住商混合大樓，歷史背景豐富，目前已有多筆淨化紀錄。',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    discussions: [
      { id: 'd1', author: '匿名鄰居', content: '最近電梯好像修好了，比較沒那麼冷。', timestamp: '2024-03-01' },
      { id: 'd2', author: '探靈家A', content: '這區磁場真的很特別，適合修行。', timestamp: '2024-03-05' }
    ]
  },
  {
    id: 'prj2',
    name: '西寧綜合大樓',
    address: '台北市萬華區西寧南路',
    description: '位於西門町周邊，雖然屋齡較高，但租金投報率極具競爭力。',
    image: 'https://images.unsplash.com/photo-1551033397-c191c7d419f8?auto=format&fit=crop&w=800&q=80',
    discussions: [
      { id: 'd3', author: '租屋客', content: '採光有點弱，但房東人很好。', timestamp: '2024-02-20' }
    ]
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    projectId: 'prj1',
    title: '錦新景觀豪華套房',
    address: '台北市中山區新生北路二段 1xx 號',
    city: '台北市',
    district: '中山區',
    market_price: 1500,
    ghost_price: 850,
    district_avg_unit: 85, 
    ping: 18,
    accident_level: 3,
    riskLevel: RiskLevel.RESENTFUL,
    zRiskScore: 72,
    deathType: '跳樓',
    year: 2018,
    createdAt: '2024-03-10',
    description: '位於市中心繁華地段，曾發生意外事故，具高度投資洗白潛力。',
    isOverseasFriendly: true,
    purified: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    lat: 25.052,
    lng: 121.524,
    is_exclusive_part: true,
    happened_during_ownership: false,
    has_disclosure_doc: true
  },
  {
    id: '2',
    projectId: 'prj2',
    title: '西寧景觀大戶',
    address: '台北市萬華區西寧南路 8xx 號',
    city: '台北市',
    district: '萬華區',
    market_price: 4800,
    ghost_price: 2800,
    district_avg_unit: 65,
    ping: 85,
    accident_level: 5,
    riskLevel: RiskLevel.EXTREME,
    zRiskScore: 98,
    deathType: '他殺',
    year: 1996,
    createdAt: '2024-01-15',
    description: '知名歷史大樓，稀有釋出。磁場強烈，建議專業洗屋師入場。',
    isOverseasFriendly: false,
    purified: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    lat: 25.044,
    lng: 121.506,
    is_exclusive_part: true,
    happened_during_ownership: true,
    has_disclosure_doc: true
  }
];

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: '大膽小鬼', icon: '👻', description: '登入即可獲得', unlocked: true },
  { id: 'b2', name: '洗白專家', icon: '🧴', description: '查詢過 10 間淨化物件', unlocked: false }
];

export const TRANSLATIONS = {
  'zh-TW': {
    title: '幽居 Hauntly',
    slogan: '洞悉瑕疵，直視恐懼。全台首款凶宅風險決策系統。',
    search: '搜尋凶宅',
    projects: '建案庫',
    riskScore: 'Z-Risk™ 分數',
    overseasGuide: '海外買家指南',
    dashboard: '探靈儀表板',
    priceHistory: '實價登錄',
    disclaimer: '免責聲明：本站資料僅供參考，不具法律效力。建議交易前諮詢專業律師及房仲。'
  },
  'en': {
    title: 'Hauntly',
    slogan: 'Peer into the unseen. Taiwan\'s first haunted property risk system.',
    search: 'Search Haunts',
    projects: 'Projects',
    riskScore: 'Z-Risk™ Score',
    overseasGuide: 'Overseas Guide',
    dashboard: 'Ghost Dashboard',
    priceHistory: 'Market Data',
    disclaimer: 'Disclaimer: Information for reference only. Consult professionals before purchase.'
  }
};