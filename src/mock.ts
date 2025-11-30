// src/mock.ts

import type { Entry } from "./types";

// Original raw mock data
interface MockGame {
  _id: { $oid: string };
  rawgId: string;
  title: string;
  imageUrl: string;
  status: "Backlog" | "Playing" | "Completed";
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
  platformNames: string[];
}

const rawMockData: MockGame[] = [
  // {
  //   _id: { $oid: "69110cb9e0f0d020a2760075" },
  //   rawgId: "552",
  //   title: "Crash Bandicoot",
  //   status: "Backlog",
  //   imageUrl:
  //     "https://media.rawg.io/media/games/bc1/bc141ec3f4ca8d1d14f0ab4e4f9e654d.jpg",
  //   createdAt: { $date: "2025-11-09T21:50:49.024Z" },
  //   updatedAt: { $date: "2025-11-09T21:50:49.024Z" },
  //   __v: 0,
  //   platformNames: ["PlayStation"],
  // },
  // {
  //   _id: { $oid: "69110cb9e0f0d020a2760076" },
  //   rawgId: "553",
  //   title: "Super Mario Bros",
  //   status: "Backlog",
  //   imageUrl:
  //     "https://media.rawg.io/media/games/154/154fea9689109f26c49c6a2db6263ef9.jpg",
  //   createdAt: { $date: "2025-11-09T21:50:49.024Z" },
  //   updatedAt: { $date: "2025-11-09T21:50:49.024Z" },
  //   __v: 0,
  //   platformNames: ["NES"],
  // },
];

// Convert raw mock data to Entry type
const mockEntries: Entry[] = rawMockData.map((game) => ({
  _id: game._id.$oid,
  title: game.title,
  imageUrl: game.imageUrl,
  username: "AlpacaSama", // always provide
  platform: game.platformNames[0], // always provide
  date: game.createdAt.$date, // always provide
  status: game.status, // default backlog
}));

export default mockEntries;
