import ShopNavbar from "@/components/shop/ShopNavbar";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-400 overflow-x-hidden flex flex-col">
      <ShopNavbar />
      <main>{children}</main>
      {/* <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-12 text-sm">
        © 2026 A2Z Shop. All rights reserved.
      </footer> */}
    </div>
  );
}