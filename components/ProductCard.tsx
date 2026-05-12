import React from "react";
import { Product } from "@/store/productStore.js";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Rating,
} from "@mui/material";

const ProductCard = React.memo(({ p }: { p: Product }) => {
    console.log("The Product Card is", p.id);
  return (
    <Card>
      <CardMedia component="img" height="140" image={p.image} alt={p.title} />

      <CardContent>
        <Typography variant="h6">{p.title}</Typography>
        <Typography color="text.secondary">${p.price}</Typography>
        <Typography variant="caption" color="text.secondary">
          {p.category}
        </Typography>{" "}
        {/* ← add */}
        <Rating value={p.rating} readOnly precision={0.1} size="small" />{" "}
        <Box sx={{ mt: 2 }}>
          <Button
            href={`/dashboard/products/${p.id}`}
            size="small"
            variant="outlined"
            fullWidth
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
},(prev, next) => prev.p.id === next.p.id,);

ProductCard.displayName = "ProductCard";
export default ProductCard;


// (prev, next) => prev.p.id === next.p.id,) this is custom comparsion function, react gives, so i get prev and next arg bedfault.