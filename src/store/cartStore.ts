// src/store/cartStore.ts
import { create } from "zustand";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  name: string;
  phone: string;
  address: string;
  delivery: string;
  items: CartItem[];
  total: number;
};

type CartStore = {
  order: Order | null;
  setOrder: (order: Order) => void;
  clearOrder: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  order: null,
  setOrder: (order) => set({ order }),
  clearOrder: () => set({ order: null }),
}));
