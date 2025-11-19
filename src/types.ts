export interface Entry {
  _id: string;
  name: string;
  imageUrl: string;
  username?: string;
  platformId: number;
  review: string;
  date: string;
  status: "Backlog" | "Playing" | "Completed";
}

export interface Game {
  _id: string;
  rawgId: string;
  title: string;
  imageUrl: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}
