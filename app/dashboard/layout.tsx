'use client';
import Navbar from '@/components/Navbar';
import { Box } from '@mui/material';

export default function  DashboardLayout ({children}:{children:React.ReactNode}){
    return(
        <Box sx={{minHeight:'100vh', bgcolor:'#f5f7fa'}}>
            <Navbar/>
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
                {children}
            </Box>
        </Box>
    )
}
