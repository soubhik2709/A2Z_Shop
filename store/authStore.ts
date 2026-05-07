import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist( //middleware to save data from refresh
    (set) => ({
      token: null,
      user: null,
      login: async (username, password) => {
        const res = await fetch('/api/proxy/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password ,expiresInMins: 60}),
        });
        console.log("the res at autStore is", res);
         if (!res.ok) {
          throw new Error("Invalid credentials");
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        set({ token: data.token, user: data });
      },
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'auth-storage' } // persists to localStorage automatically 
  )
);


// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthUser {
//   username: string;
// }

// interface AuthState {
//   user: AuthUser | null;
//   token: string | null;

//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,

//       login: async (username, password) => {
//         // fake login
//         if (username === "admin" && password === "1234") {
//           set({
//             user: { username },
//             token: "fake-jwt-token",
//           });
//         } else {
//           throw new Error("Invalid credentials");
//         }
//       },

//       logout: () => {
//         set({
//           user: null,
//           token: null,
//         });
//       },
//     }),
//     {
//       name: "auth-storage",
//     }
//   )
// );