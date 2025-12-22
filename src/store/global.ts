import { create } from "zustand";

type DrawerState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    setOpen: (value: boolean) => void;
};

export const useDrawerStore = create<DrawerState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    setOpen: (value) => set({ isOpen: value }),
}));
