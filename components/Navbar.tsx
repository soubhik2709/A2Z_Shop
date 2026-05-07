'use client';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Panel</Typography>
        <Box display="flex" gap={2}>
          <Button color="inherit" component={Link} href="/dashboard/users">Users</Button>
          <Button color="inherit" component={Link} href="/dashboard/products">Products</Button>
          <Button color="inherit" onClick={() => { logout(); router.push('/login'); }}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}