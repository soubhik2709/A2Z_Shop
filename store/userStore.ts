// For dummyjson api
import { create } from "zustand";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company: { name: string };
}

interface UserState {
  users: User[];
  total: number;
  cache: Record<string, User[]>;
  loading:boolean;
  fetchUsers: (limit: number, skip: number, search?: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  total: 0,
  cache: {},
  loading: false,
  fetchUsers: async (limit, skip, search = "") => {
    set({ loading: true });
    const cacheKey = `${skip}-${search}`;

    if (get().cache[cacheKey]) {
      console.log("The cache we got", get().cache[cacheKey]); //Testing
      set({ users: get().cache[cacheKey], loading:false });
      return;
    }

    try {
      const url = search
        ? `/api/proxy/users/search?q=${search}&limit=${limit}&skip=${skip}`
        : `/api/proxy/users?limit=${limit}&skip=${skip}`;
      // console.log("Fetching:", url);
      const res = await fetch(url);
      // console.log("Response:", res);

      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
      }
      const data = await res.json();

      set((state) => ({
        users: data.users || [],//if API returns empty array , diff structure, error mesage instead of users then users become undefined so use empty array instead.
        total: data.total || 0,
        cache: { ...state.cache, [cacheKey]: data.users || [] },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.error("User fetch error:", error);
    }
  },
}));


// i dont want to use the || [] cause this will stop the execution and not showing the results ultimately, but  i want results after loading