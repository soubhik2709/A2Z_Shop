// import ProductsGrid from "@/components/shop/ProductsGrid";
import ProductCard from "@/components/shop/ProductCard";

export const metadata = {
  title: "Products – A2Z Shop",
  description: "Browse all products on A2Z Shop",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* <ProductsGrid /> */}
      <ProductCard/>
    </div>
  );
}