import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.productId === product.productId,
      );
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.productId === product.productId
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

  removeItem: (productId) =>
    set((state) => {
      const updatedItems = state.items.filter(
        (item) => item.productId !== productId,
      );
      return { items: updatedItems };
    }),

  updatedQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const updatedItems = state.items.filter(
          (item) => item.productId !== productId,
        );
        return { items: updatedItems };
      } else {
        const updatedItems = state.items.map((item) =>
          item.productId === productId ? { ...item, quantity: quantity } : item,
        );
        return { items: updatedItems };
      }
    }),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
