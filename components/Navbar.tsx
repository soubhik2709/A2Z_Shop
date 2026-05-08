'use client';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return (
    <AppBar sx={{position:"sticky",elevation:1,bgcolor:'#1e293b'}}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: 3 }}>
          <Box  sx={{display:"flex", alignItems:"center",gap:1 ,flexGrow: 1 }}>
          <DashboardIcon />
          <Typography sx={{variant:"h6", fontWeight:'bold'}}>
            Help Study Abroad
          </Typography>
        </Box>
        {/* <Typography variant="h6" sx={{ flexGrow: 1, cursor:"pointer" }}>Admin Panel</Typography> */}
        <Box sx={{display:"flex" ,gap:2}}>
          <Button color="inherit" component={Link} href="/dashboard/users">Users</Button>
          <Button color="inherit" component={Link} href="/dashboard/products">Products</Button>
          <Button color="inherit" onClick={() => { logout(); router.push('/login'); }}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}