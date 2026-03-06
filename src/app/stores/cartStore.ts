import { create } from "zustand";
import { CartStore } from "../interfaces";

const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      
      const existingItem = state.items.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        return { items: updatedItems };
      } else {
        const newItem = { ...product, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        return { items: updatedItems };
      }
    }),

  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.items.filter(
        (item) => item.id !== id,
      );
      return { items: updatedItems };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const updatedItems = state.items.filter(
          (item) => item.id !== id,
        );
        return { items: updatedItems };
      } else {
        const updatedItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item,
        );
        return { items: updatedItems };
      }
    }),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
