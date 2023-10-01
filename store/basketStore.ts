import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
}

export interface BasketStore {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
  total: number;
}

const useBasketStore = create<BasketStore>()((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product: Product) => {
    set((state) => {
      state.items += 1;
      state.total += product.price;
      const hasProduct = state.products.find((p) => p.id === product.id);

      if (hasProduct) {
        hasProduct.quantity += 1;
        return { products: [...state.products] };
      } else {
        return { products: [...state.products, { ...product, quantity: 1 }] };
      }
    });
  },
  reduceProduct: (product) => {
    set((state) => {
      state.total -= product.price;
      state.items -= 1;
      return {
        products: state.products
          .map((P) => {
            if (P.id === product.id) {
              P.quantity -= 1;
            }
            return P;
          })
          .filter((p) => p.quantity > 0),
      };
    });
  },
  clearCart: () => set({ products: [], total: 0, items: 0 }),
}));

export default useBasketStore;