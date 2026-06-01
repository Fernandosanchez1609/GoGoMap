export interface Point {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  odsNumber: number;
}

export interface PointDetail{
  id: number;
  title: string;
  description: string;
  address: string;
  status: string;
  odsNumber: number;
  ods: string;
}

export type ActionType = 'VISIT' | 'REPORT';

export interface UserActionResponse {
  action: ActionType;
  karmaEarned: number;
  newTotalKarma: number;
  message: string;
}

export interface UserRanking {
  username: string;
  karmaPoints: number;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  iconName: string;
  requiredKarma: number;
  unlocked: boolean;
}