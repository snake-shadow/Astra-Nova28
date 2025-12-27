export interface TacticalSection {
  title: string;
  type: 'telemetry' | 'analysis' | 'visual' | 'anomaly' | 'lore';
  content: string[];
}

export interface ContentResponse {
  hook: string;
  sections: TacticalSection[];
  sources: { title: string; url: string }[];
}

export enum ContentMode {
  FACTS = 'FACTS'
}

export interface HistoryItem {
  id: string;
  topic: string;
  mode: ContentMode;
  timestamp: number;
  content: ContentResponse;
}