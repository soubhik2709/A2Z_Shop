'use client';
import {useEffect,useState} from 'react';
import {useParams} from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';

interface UserDetail {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  company: { name: string };
  address: { city: string; country: string };
}


export default function UserDetailPage(){
    const {id} = useParams();
    const [user,setUser] = useState<UserDetail | null>(null);

    useEffect(()=>{
        fetch(`/api/proxy/users/${id}`).then(r =>r.json()).then(setUser);
    },[id]);

    if(!user) return <Box p={3}>Loading...</Box>

    return (
        <ProtectedRoute>
        <Box p={3} sx={{maxWidth:700}}  mx="auto">
        <Button component={Link} href="/dashboard/users" sx={{ mb: 2 }}>
          ← Back to Users
        </Button>  
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography><b>Email:</b> {user.email}</Typography>
          <Typography><b>Phone:</b> {user.phone}</Typography>
          <Typography><b>Gender:</b> {user.gender}</Typography>
          <Typography><b>Age:</b> {user.age}</Typography>
          <Typography><b>Company:</b> {user.company?.name}</Typography>
          <Typography><b>Address:</b> {user.address?.city}, {user.address?.country}</Typography>
        </Paper>

        </Box>
        </ProtectedRoute>
    )
}
