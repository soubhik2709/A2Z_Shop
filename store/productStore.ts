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
  loading:boolean;
  fetchProducts: (limit: number, skip: number, search?: string, category?: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading:false,
  fetchProducts: async (limit, skip, search = "", category = "") => {
    set({loading:true});
    let url = "";

    if (category) {
      url = `/api/proxy/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else if (search) {
      url = `/api/proxy/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    } else {
      url = `/api/proxy/products?limit=${limit}&skip=${skip}`;
    }


    try {
    const res = await fetch(url);

      if(!res.ok){
                throw new Error("Failed to fetch users");
             }
    const data = await res.json();
    set({ products: data.products, loading:false});

    } catch (error) {
    set({ loading: false ,products: []});// stop loading on error,
    console.error("User fetch error:", error);
    }

   

  },
}));


