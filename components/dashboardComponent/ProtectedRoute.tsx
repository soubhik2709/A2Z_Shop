"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {Box, CircularProgress} from "@mui/material";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAuthStore((s) => s.token);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  console.log("TOKEN:", token);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer); 
  }, [token, router]);

  if (loading) {
     return (
       <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
         <CircularProgress />
       </Box>
     );
  }
  return <>{children}</>;
}


/* 
use here setTimeout cause ->Zustand initially returns null, and we need some time to check the token before redirect to the route. (Zustand needs time to read from localStorage call Hydration).

----------------------------------------

As this is CSR so browser run the code, and then UI show . so for changing the protected Route only  this Loading component will display.Here brow receive page then Auth happens.
----------------------------------------

But in SSR the browser send the req to the server , on that time the current  page stays there. Then directly goes to the protected page if authenticate.So no loading component require.
----------------------------------------
My Project is use localstorage to save the token data in local sto. server cant acces localSto . only browser can. IN SSR we use http-only cookie method.

-----------------------------------------
 Why use setTimeout and clearTimeout?-->
The setTimeout (The "Hydration" Buffer):
When your app first loads, Zustand (your store) needs a tiny fraction of a second to "hydrate" or read the token from localStorage. If you check for the token immediately, it might return null for a millisecond before the store is ready. This would incorrectly kick the user back to the /login page. The 100ms delay acts as a "safety buffer" to ensure the token is actually missing before redirecting.

The clearTimeout (The "Cleanup"):
In React, useEffect can run multiple times.

If the token changes quickly, or if the user navigates away before the 100ms is up, the old timer is still "ticking" in the background.

If you don't clear it, the old timer might trigger router.push("/login") even if the user is now on a different page or the token finally arrived.
----------------------------------------

*/
