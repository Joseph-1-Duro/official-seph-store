import { create } from "zustand";

interface CartState {
  isCartOpen: boolean;
  count: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCount: (count: number) => void;
}

export const useCartStore = create<CartState>()(set => ({
  isCartOpen: false,
  count: 0,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
  setCount: count => set({ count }),
}));
