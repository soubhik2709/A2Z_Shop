"use client";
import Link from "next/link";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { useCallback, useEffect, useState } from "react";
// import ProtectedRoute from '@/components/ProtectedRoute'; //use the protectedRoute later ,

export default function DashboardPage() {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [error, setError] = useState(false);


  const loadStats = useCallback(()=>{
    setError(false);
    setTotalUsers(null);
    setTotalProducts(null);
 
    // Total Users
    fetch("/api/proxy/users?limit=1&skip=0")
    .then((r)=>{if(!r.ok) throw new Error();return r.json(); })
    .then((d)=>setTotalUsers(d.total))
    .catch(() => setError(true));

    //Total Products
      fetch("/api/proxy/products?limit=1&skip=0")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => setTotalProducts(d.total))
      .catch(() => setError(true));

  },[]);

useEffect(() => {
  // Define an async wrapper to handle the mounting logic
  const initialize =  () => {
     loadStats();
  };

  initialize();
}, [loadStats]);


  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: <PeopleIcon fontSize="large" color="primary" />,
    },
    {
      label: "Total Products",
      value: totalProducts,
      icon: <InventoryIcon fontSize="large" color="secondary" />,
    },
    {
      label: "Active Admins",
      value: 1,
      icon: <AdminPanelSettingsIcon fontSize="large" color="success" />,
    },
  ];

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
        Welcome to the A2Z_Shop admin panel.
      </Typography>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6 }} sx={{ mb: 4 }} key={stat.label}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                {stat.icon}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {stat.value === null ? (
                      error ? (
                        <Button size="small" onClick={loadStats}>
                          Retry
                        </Button>
                      ) : (
                        "..."
                      )
                    ) : (
                      stat.value
                    )}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Management */}

      <Typography variant="h5" sx={{ mb: 2 }}>
        Management
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                Users Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View, search, and manage users.
              </Typography>
              <Button
                component={Link}
                href="/dashboard/users"
                variant="contained"
              >
                Go to Users
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                Products Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View, filter, and manage products.
              </Typography>
              <Button
                component={Link}
                href="/dashboard/products"
                variant="contained"
              >
                Go to Products
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}


/* 

  const loadStats = useCallback(()=>{
   i use here useCallback for stay ahead from multiple rendering. the   loadStats(); funct is changing the states , so useEffect run then state changes then again some rerender happens and this is called cascade rendering, so if this rendering happens then react dev tools, elsint debugger tools may thinks react optimization, infinite renderig, not proper way of using render cascading, so thats why i use the wrap the function in the another function inside the useEffect, now the React doesnt knew about the wrapper funciton. 

*/