
import { Property, RiskLevel, Language } from './types';

export const TAIWAN_REGIONS = {
  municipalities: [
    { key: 'taipei', zh: '臺北市', ja: '台北市', en: 'Taipei' },
    { key: 'new_taipei', zh: '新北市', ja: '新北市', en: 'New Taipei' },
    { key: 'taoyuan', zh: '桃園市', ja: '桃園市', en: 'Taoyuan' },
    { key: 'taichung', zh: '臺中市', ja: '台中市', en: 'Taichung' },
    { key: 'tainan', zh: '臺南市', ja: '台南市', en: 'Tainan' },
    { key: 'kaohsiung', zh: '高雄市', ja: '高雄市', en: 'Kaohsiung' },
  ],
  cities: [
    { key: 'keelung', zh: '基隆市', ja: '基隆市', en: 'Keelung' },
    { key: 'hsinchu_city', zh: '新竹市', ja: '新竹市', en: 'Hsinchu City' },
    { key: 'chiayi_city', zh: '嘉義市', ja: '嘉義市', en: 'Chiayi City' },
  ],
  counties: [
    { key: 'yilan', zh: '宜蘭縣', ja: '宜蘭県', en: 'Yilan' },
    { key: 'hsinchu_county', zh: '新竹縣', ja: '新竹県', en: 'Hsinchu County' },
    { key: 'miaoli', zh: '苗栗縣', ja: '苗栗県', en: 'Miaoli' },
    { key: 'changhua', zh: '彰化縣', ja: '彰化県', en: 'Changhua' },
    { key: 'nantou', zh: '南投縣', ja: '南投県', en: 'Nantou' },
    { key: 'yunlin', zh: '雲林縣', ja: '雲林県', en: 'Yunlin' },
    { key: 'chiayi_county', zh: '嘉義縣', ja: '嘉義県', en: 'Chiayi County' },
    { key: 'pingtung', zh: '屏東縣', ja: '屏東県', en: 'Pingtung' },
    { key: 'taitung', zh: '臺東縣', ja: '台東県', en: 'Taitung' },
    { key: 'hualien', zh: '花蓮縣', ja: '花蓮県', en: 'Hualien' },
    { key: 'penghu', zh: '澎湖縣', ja: '澎湖県', en: 'Penghu' },
    { key: 'kinmen', zh: '金門縣', ja: '金門県', en: 'Kinmen' },
    { key: 'lienchiang', zh: '連江縣', ja: '連江県', en: 'Lienchiang' },
  ]
};

export const TRANSLATIONS: Record<Language, any> = {
  zh: {
    discover: '任務版',
    map: '靈界雷達',
    upload: '資產鑑定',
    profile: '獵人手冊',
    login: '身分驗證',
    searchPlace: '搜尋直轄市/縣市...',
    socialLogin: '快速連結',
    emailLogin: '電子郵件登入',
    guest: '訪客模式',
    roi: '預估回報',
    risk: '凶惡等級',
    investigate: '展開調查',
    appraisal: '提交鑑定',
    loading: '連線靈界中...',
    news: '即時靈訊',
    labels: {
      [RiskLevel.NATURAL]: '淨化完成',
      [RiskLevel.SUICIDE]: '冤魂低語',
      [RiskLevel.ACCIDENT]: '血色意外',
      [RiskLevel.HOMICIDE]: '惡靈降臨',
      [RiskLevel.MAJOR_CRIME]: '禁忌禁區',
    }
  },
  ja: {
    discover: 'クエスト',
    map: '霊界レーダー',
    upload: '資産鑑定',
    profile: 'ハンター手帳',
    login: '身分証明',
    searchPlace: '市区町村を検索...',
    socialLogin: 'ソーシャルログイン',
    emailLogin: 'メールアドレス',
    guest: 'ゲスト',
    roi: '予想利回り',
    risk: '凶悪レベル',
    investigate: '調査開始',
    appraisal: '鑑定提出',
    loading: '霊界に接続中...',
    news: '緊急霊報',
    labels: {
      [RiskLevel.NATURAL]: '浄化済',
      [RiskLevel.SUICIDE]: '怨念の声',
      [RiskLevel.ACCIDENT]: '惨劇',
      [RiskLevel.HOMICIDE]: '凶行',
      [RiskLevel.MAJOR_CRIME]: '禁忌',
    }
  },
  en: {
    discover: 'Quests',
    map: 'Ghost Radar',
    upload: 'Appraisal',
    profile: 'Hunter ID',
    login: 'Identity Auth',
    searchPlace: 'Search Municipalities...',
    socialLogin: 'Social Connect',
    emailLogin: 'E-mail Login',
    guest: 'Enter as Guest',
    roi: 'ROI Est.',
    risk: 'Danger',
    investigate: 'Start Mission',
    appraisal: 'Submit Appraisal',
    loading: 'Syncing Ethereal...',
    news: 'Live Feed',
    labels: {
      [RiskLevel.NATURAL]: 'Purified',
      [RiskLevel.SUICIDE]: 'Whispers',
      [RiskLevel.ACCIDENT]: 'Tragedy',
      [RiskLevel.HOMICIDE]: 'Malice',
      [RiskLevel.MAJOR_CRIME]: 'Forbidden',
    }
  }
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: { zh: '信義區寂靜豪邸', ja: '信義サイレントラグジュアリー', en: 'Xinyi Luxury Silent Suite' },
    address: { zh: '台北市信義區', ja: '台北市信義区', en: 'Xinyi District, Taipei City' },
    region: 'taipei',
    price: 45000000,
    area: 45.5,
    years: 12,
    riskLevel: RiskLevel.SUICIDE,
    incidentDate: '2022-05-14',
    incidentType: { zh: '過勞自殺', ja: '過労自殺', en: 'Suicide (Overwork)' },
    description: { 
      zh: '高樓層豪華套房，通風極佳。前屋主為科技業高管。',
      ja: '高層階の豪華スイート。前オーナーはIT企業の役員。',
      en: 'A high-floor luxury suite. Previous owner was a tech executive.' 
    },
    roi: 4.2,
    daysSinceIncident: 650,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    purifiedImageUrl: 'https://images.unsplash.com/photo-1600607687960-4a2123f7516e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: { zh: '大稻埕百年古宅', ja: '大稻埕の百年古宅', en: 'Old Town Heritage Manor' },
    address: { zh: '台北市大同區', ja: '台北市大同区', en: 'Datong District, Taipei City' },
    region: 'taipei',
    price: 18000000,
    area: 32,
    years: 45,
    riskLevel: RiskLevel.MAJOR_CRIME,
    incidentDate: '1998-11-02',
    incidentType: { zh: '重大集體衝突', ja: '重大集団紛争', en: 'Mass Conflict Incident' },
    description: { 
      zh: '具深厚歷史底蘊。曾發生過重大流血衝突。',
      ja: '深い歴史を持つ。大規模な流血事件が発生した場所。',
      en: 'Significant historical roots. Dark legacy of mass conflict.' 
    },
    roi: 7.5,
    daysSinceIncident: 9200,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    purifiedImageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'
  }
];

export const RISK_COLORS = {
  [RiskLevel.NATURAL]: 'text-cyan-400',
  [RiskLevel.SUICIDE]: 'text-yellow-400',
  [RiskLevel.ACCIDENT]: 'text-orange-500',
  [RiskLevel.HOMICIDE]: 'text-red-500',
  [RiskLevel.MAJOR_CRIME]: 'text-purple-500',
};
