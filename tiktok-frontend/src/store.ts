import { create } from "zustand";

type State = {
  isOpen: boolean;
  badges: Record<string, Record<number, number>>;
  currentId: string;
  // playingVideo: string;
};

type Toggle = {
  toggle: () => void;
  incrBadge: (userId: string, badgeType: number) => void;
  setCurrentId: (id: string) => void;
  // setPlayingVideo: (videoID: string) => void;
};

export const useStore = create<State & Toggle>((set) => ({
  isOpen: false,
  currentId: "",
  // playingVideo:'',
  badges: {
    video1: { 1: 5, 2: 3, 3: 0, 4: 1, 5: 5, 6: 8 },
    video2: { 1: 0, 2: 0, 3: 0, 4: 0 },
    livestream1: { 1: 1, 2: 1, 3: 1, 4: 1 },
  },
  toggle: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
  setCurrentId: (id) => set((state) => ({ ...state, currentId: id })),
  // setPlayingVideo: (videoID) => set((state) => ({ ...state, playingVideo: videoID })),
  incrBadge: (userId, badgeType) =>
    set((state) => {
      const userBadges = state.badges[userId] || {};
      const newCount = (userBadges[badgeType] || 0) + 1;
      return {
        ...state,
        badges: {
          ...state.badges,
          [userId]: {
            ...userBadges,
            [badgeType]: newCount,
          },
        },
      };
    }),
}));
