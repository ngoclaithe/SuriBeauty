import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { AdminLayout } from "./components/layouts/AdminLayout";

// Frontend Pages
import { HomePage } from "./pages/HomePage";
import { ProductListPage } from "./pages/ProductListPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LandingPage } from "./pages/LandingPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";

// Admin Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ProductManagement } from "./pages/admin/ProductManagement";
import { OrderManagement } from "./pages/admin/OrderManagement";
import { CustomerManagement } from "./pages/admin/CustomerManagement";
import { LandingPageBuilder } from "./pages/admin/LandingPageBuilder";
import { BlogManagement } from "./pages/admin/BlogManagement";
import { MarketingManagement } from "./pages/admin/MarketingManagement";
import { MediaLibrary } from "./pages/admin/MediaLibrary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "landing/:slug", element: <LandingPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogDetailPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <ProductManagement /> },
      { path: "orders", element: <OrderManagement /> },
      { path: "customers", element: <CustomerManagement /> },
      { path: "landing-builder", element: <LandingPageBuilder /> },
      { path: "blog", element: <BlogManagement /> },
      { path: "marketing", element: <MarketingManagement /> },
      { path: "media", element: <MediaLibrary /> },
    ],
  },
]);
