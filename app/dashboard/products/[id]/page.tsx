'use client';
import {useEffect , useState} from 'react';
import {useParams} from 'next/navigation';
import { Box, Typography, Paper, Button, Rating } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

type ProductsDetails = {
  title: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  stock: number;
  rating: number;
  thumbnail: string;
  images?: string[];
};//is this type is okay?

export default function ProductDetailPage(){
    const {id} = useParams();
    const [product, setProducts] = useState<ProductsDetails | null>(null);



    useEffect(()=>{
        fetch(`/api/proxy/products/${id}`).then(r => r.json()).then(setProducts);
    },[id]);

    if(!product) return <Box p={3}>Loading...</Box>;

    return (
    <ProtectedRoute>
      <Box p={3} sx={{maxWidth:700}} mx="auto">
        <Button component={Link} href="/dashboard/products" sx={{ mb: 2 }}>
          ← Back to Products
        </Button>
        <Paper sx={{ p: 3 }}>
          <Box component="img" src={product.thumbnail} width="50%" height="20%"  sx={{ borderRadius: 2, mb: 2  }} />
          <Typography variant="h4">{product.title}</Typography>
          <Typography color="text.secondary" mb={1}>{product.description}</Typography>
          <Typography variant="h5" color="primary">${product.price}</Typography>
          <Typography><b>Category:</b> {product.category}</Typography>
          <Typography><b>Brand:</b> {product.brand}</Typography>
          <Typography><b>Stock:</b> {product.stock}</Typography>
          <Box display="flex" sx={{alignItems:"center"}}  gap={1} mt={1}>
            <Rating value={product.rating} readOnly precision={0.1} />
            <Typography>{product.rating}</Typography>
          </Box>
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}
