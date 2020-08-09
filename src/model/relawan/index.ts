export interface Relawan {
  id: number;
  name: string;
  email: string;
  city: string;
  skill: string;
}

export interface RelawanData {
  allRelawan: Relawan[];
}

export interface Relawans {
  relawan: Relawan;
}
