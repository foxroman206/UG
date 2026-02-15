
export enum RiskLevel {
  NATURAL = 1,
  SUICIDE = 2,
  ACCIDENT = 3,
  HOMICIDE = 4,
  MAJOR_CRIME = 5
}

export type Language = 'zh' | 'ja' | 'en';

export interface User {
  id: string;
  name: string;
  level: number;
  exp: number;
  isLoggedIn: boolean;
  avatar?: string;
}

export interface Property {
  id: string;
  title: Record<Language, string>;
  address: Record<Language, string>;
  region: string; // Region key from constants
  price: number;
  area: number;
  years: number;
  riskLevel: RiskLevel;
  incidentDate: string;
  incidentType: Record<Language, string>;
  description: Record<Language, string>;
  roi: number;
  daysSinceIncident: number;
  imageUrl: string;
  purifiedImageUrl: string;
}

export interface RiskAnalysis {
  rating: number;
  reason: string;
  psychologicalImpact: string;
  investmentAdvice: string;
}
