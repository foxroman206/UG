export enum RiskLevel {
  NONE = 0,
  SLIGHT = 1,
  CHILLY = 2,
  RESENTFUL = 3,
  BLOOD = 4,
  EXTREME = 5
}

export type UserRole = 'USER' | 'AGENT' | 'SPECIALIST';
export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED';

export interface Discussion {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  address: string;
  description: string;
  image: string;
  discussions: Discussion[];
}

export interface Property {
  id: string;
  projectId?: string; // 所屬建案 ID
  title: string;
  address: string;
  city: string;
  district: string;
  market_price: number;
  ghost_price: number;
  district_avg_unit: number;
  ping: number;
  accident_level: number; // 1-5
  riskLevel: RiskLevel; 
  zRiskScore: number; 
  deathType: string;
  year: number;
  createdAt: string; // 發布日期
  description: string;
  isOverseasFriendly: boolean;
  purified: boolean; 
  purification_progress?: number; // 0-100
  image: string;
  lat: number;
  lng: number;
  is_exclusive_part: boolean;
  happened_during_ownership: boolean;
  has_disclosure_doc: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'email';
  isLoggedIn: boolean;
  role: UserRole;
  bravery_level: number;
  verification_status: VerificationStatus;
}

export interface UserState {
  level: number;
  exp: number;
  rankName: string;
  badges: Badge[];
  profile?: UserProfile;
}

export type Language = 'zh-TW' | 'en';
export type SortOption = 'price_asc' | 'price_desc' | 'date_new' | 'level_asc' | 'roi_desc';
