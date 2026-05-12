import { create } from "zustand";
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}
interface ProductState {
  products: Product[];
  loading: boolean;
  fetchProducts: (
    limit: number,
    skip: number,
    search?: string,
    category?: string,
  ) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  fetchProducts: async (limit, skip, search = "", category = "") => {
    // if (get().loading) return;
    set({ loading: true });

    let url = "";
    if (category) {
      url = `/api/proxy/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else if (search) {
      url = `/api/proxy/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    } else {
      url = `/api/proxy/products?limit=${limit}&skip=${skip}`;
    }

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      console.log("the products is ",data);

      const products = data.products ?? [];

      // if (data.mesage && data.mesage.includes("limit exceeded")) {
      //   set({ loading: false });
      //   alert("Too many requests! Please wait a moment.");
      //   return;
      // }

      if(products.length>0){
            set({ products, loading: false });
      }else{
         set({ products: [], loading: false });
      }

    } catch (error) {
      set({ loading: false}); // stop loading on error,
      console.error("Product fetch error:", error);
    }
  },
}));
