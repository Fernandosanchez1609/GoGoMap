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