"use client";
// import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState, useMemo } from "react";
import { useProductStore, Product } from "@/store/productStore";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import ProductCard from "@/components/dashboardComponent/ProductCard";
import Link from "next/link";
import { useShallow } from "zustand/shallow";

// debounce
function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    //This extracts the real argument types from args
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function ProductsPage() {
  // const { products, fetchProducts, loading } = useProductStore();
  const { products, fetchProducts, loading } = useProductStore(
    useShallow((state) => ({
      products: state.products,
      fetchProducts: state.fetchProducts,
      loading: state.loading,
    })),
  );//the  productstore data keep  same refernce from rerendering, untill come from API.

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts(10, page * 10, search, category);
  }, [page, search, category, fetchProducts]); 
  
  const handleSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val as string);
        setPage(0);
      }, 400),
    [],
  );
  // if (loading && (!products || products.length === 0))   return <p>Loading your products...</p>; ////This replavce the main cmponet while loading is true

  // if(!products) return <p>Error: Could not retrieve Products. Try Refresh again</p>
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Button
          component={Link}
          href="/dashboard"
          variant="text"
          size="small"
          sx={{ mb: 2 }}
        >
          / dashboard
        </Button>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Products
        </Typography>

        {/* Search */}
        <TextField
          label="Search Products"
          fullWidth
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value); // ← display updates instantly
            handleSearch(e.target.value); // ← fetch waits 400ms
          }}
          sx={{ mb: 2 }}
        />

        {/* Category */}
        <Select
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 3 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="smartphones">Smartphones</MenuItem>
          <MenuItem value="laptops">Laptops</MenuItem>
          <MenuItem value="fragrances">Fragrances</MenuItem>
        </Select>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={28} />
          </Box>
        )}

        {/* Prodcut display section */}

        {/* Grid */}
        <Grid container spacing={2}>
          {products?.map(
            (
              p: Product, 
            ) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
                <ProductCard p={p} />
              </Grid>
            ),
          )}
        </Grid>

        {/* Try again later: */}
        {!loading && products.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography sx={{ mb: 1 }}>No products found.</Typography>
            <Button
              variant="outlined"
              onClick={() => fetchProducts(10, page * 10, search, category)}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Pagination */}
        <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            Page {page + 1}
          </Typography>
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        </Box>
      </Box>
    </>
  );
}



/*
What is Debouncing?
Debouncing means:
“Wait before executing. If another event happens, reset the timer.” without debounce , every letters make api calls. Means  user typing and for every typing letter the api calls which is prevented.

-----------------------------------------
step 1 
function debounce<Args extends unknown[]>(

This is TypeScript generics. It means: This debounce can work with ANY function arguments.
Example:

debounce((name: string) => {}, 400)

debounce((a: number, b: number) => {}, 400)

----------------
Step 2
fn: (...args: Args) => void

Meaning:
fn is a function
that accepts:

...args measns  (arguments)

and returns: void

Example
If:

debounce((val: string) => {}, 400)

Then:

Args = [string]

----------------
Step 3
delay: number

Step 4
let timer: ReturnType<typeof setTimeout>;

It is saying:

“The variable timer should have the SAME type as whatever setTimeout() returns.”
setTimeout can return number  for browser or object for nodejs envrionment. That  returns value store on the varaible, which is used to cancel timeout later.
TypeScript asks:

What TYPE is timer?

Is it:

number?
object?
string?

We must define it.

Browser return setTimeout number, but Nodejs reuturn object.

Prart1 :typeof setTimeout------------

means:
Get the TYPE of setTimeout function


Part2 :ReturnType<T> is a built-in TypeScript utility type.--------

It extracts:
the return type of a function


step 5 
debouce return this functions and this fun is differ from the handleSearch fun . the differenc is setTimeout has  not extra clearTimeout present in the hanldeSearch.
(val) => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    setSearch(val);
    setPage(0);
  }, 400);
}
*/