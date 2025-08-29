import { create } from 'zustand';

type State = {
  isOpen: boolean;
};

type Toggle = {
  toggle: () => void;
};


export const useStore = create<State & Toggle>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));