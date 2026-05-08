"use client";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f7fa",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 4 },
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
