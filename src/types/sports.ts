export type SportType = 'all' | 'soccer' | 'basketball' | 'tennis' | 'hockey' | 'baseball' | 'football';

export type ConfidenceTier = 'Ultra Banker' | 'High Conviction' | 'Value Edge';

export interface KeyStat {
  label: string;
  value: string;
  impact: 'positive' | 'neutral' | 'negative';
}

export interface PeculiarMarket {
  marketName: string;
  selection: string;
  odds: number;
  impliedProbability: number; // e.g. 74.6%
  modelProbability: number;   // e.g. 91.2%
  edgePercent: number;        // e.g. +16.6%
  historicalAccuracy: {
    hits: number;
    sampleSize: number;
    rate: number;
    description: string;
  };
  expertConsensus: {
    score: number;
    totalModelsAnalyzed: number;
    sharpBooksAgreement: string;
  };
  rationale: string;
  tacticalMismatch: string;
  keyStats: KeyStat[];
  peculiarFactor: string;
}

export interface H2HRecord {
  date: string;
  home: string;
  away: string;
  score: string;
  marketOutcome: 'hit' | 'miss';
}

export interface FormItem {
  opponent: string;
  score: string;
  result: 'W' | 'D' | 'L';
  marketOutcome: 'hit' | 'miss';
}

export interface Match {
  id: string;
  sport: 'soccer' | 'basketball' | 'tennis' | 'hockey' | 'baseball' | 'football';
  league: string;
  homeTeam: string;
  awayTeam: string;
  scheduledTime: string;
  venue: string;
  status: 'upcoming' | 'live' | 'finished';
  confidenceTier: ConfidenceTier;
  isTurnoverQualified: boolean;
  peculiarMarket: PeculiarMarket;
  h2h: H2HRecord[];
  formGuide: {
    home: FormItem[];
    away: FormItem[];
  };
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  sport: 'soccer' | 'basketball' | 'tennis' | 'hockey' | 'baseball' | 'football';
  matchId: string;
  confidence: number;
  odds: number;
  read: boolean;
  type: 'banker_alert' | 'line_movement' | 'turnover_ready' | 'ev_surge';
}

export interface AlertSettings {
  minConfidence: number;
  minOdds: number;
  maxOdds: number;
  sports: {
    soccer: boolean;
    basketball: boolean;
    tennis: boolean;
    hockey: boolean;
    baseball: boolean;
    football: boolean;
  };
  soundEnabled: boolean;
  browserPushEnabled: boolean;
  notifyOnTurnoverPick: boolean;
}

export interface BankrollDayRecord {
  day: number;
  date: string;
  openingBalance: number;
  targetOdds: number;
  stake: number;
  profit: number;
  closingBalance: number;
  status: 'won' | 'lost' | 'pending';
  matchSummary: string;
}

export interface DeepAnalysisResult {
  matchId: string;
  executiveSummary: string;
  confidenceScore: number;
  peculiarEdgeBreakdown: string;
  historicalPrecedent: string;
  consensusBreakdown: {
    syndicateVote: string;
    sharpBooksShift: string;
    algorithmicSimulations: string;
  };
  riskFactors: string[];
  bankrollAdvice: {
    turnoverSuitability: string;
    recommendedKellyFraction: string;
    optimalEntryOdds: number;
  };
}
