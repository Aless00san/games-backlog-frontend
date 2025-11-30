export interface Entry {
  _id: string;
  title: string;
  imageUrl: string;
  username?: string;
  platform: string;
  date: string;
  status: "Backlog" | "Playing" | "Completed";
}

export interface Game {
  _id: string;
  rawgId: string;
  title: string;
  imageUrl: string;
  platformNames: string[];
  createdAt: string;
  updatedAt: string;
}
