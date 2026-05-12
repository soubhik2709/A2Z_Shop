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
  cache: Record<string, {users:User[]; total:number}>;
  loading: boolean;
  fetchUsers: (limit: number, skip: number, search?: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  total: 0,
  cache: {},
  loading: false,
  fetchUsers: async (limit, skip, search = "") => {
    // if (get().loading) return;
    const cacheKey = `${skip}-${search}`;

    if (get().cache[cacheKey]) {
      const cached = get().cache[cacheKey];
      console.log("The cache we got", cached); //Testing

      set({ users:cached.users, total:cached.total});
      return;
    }
    set({ loading: true });


    try {
      const url = search
        ? `/api/proxy/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
        : `/api/proxy/users?limit=${limit}&skip=${skip}`;
      // console.log("Fetching:", url);
      const res = await fetch(url);
      // console.log("Response:", res);

      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
      }
      const data = await res.json();

      const users = data.users ?? [];
      const total = data.total ?? 0;
      // console.log("Full API Data:", data);

        if (users.length > 0) {
        set((state) => ({
          users,
          total,
          loading: false,
          cache: {
            ...state.cache,
            [cacheKey]: { users, total },
          },
        }));
      } else {
        //if user not found then dont cache empty.
        set({ users: [], total: 0, loading: false });
      }

      // set((state) => ({
      //   //why  i write here state? what is state?
      //   users: data.users ?? [], //if API returns empty array , diff structure, error mesage instead of users then users become undefined so use empty array instead.
      //   total: data.total ??  0,
      //   cache: { ...state.cache, [cacheKey]:{users:data.users ?? [], total:data.total ?? 0} },
      //   loading: false,
      // }));


    } catch (error) {
      set({ loading: false });
      console.error("User fetch error:", error);
    }
  },
}));

