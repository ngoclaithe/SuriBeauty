import { Outlet, Link, useLocation } from "react-router";
import { ShoppingCart, Search, Menu, User, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        {/* Top Bar */}
        <div className="bg-primary text-primary-foreground py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm">Free shipping on orders over $50 • 30-day returns</p>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-xl">L</span>
              </div>
              <span className="text-xl font-semibold">LUXE</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground'}`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`hover:text-primary transition-colors ${isActive('/products') ? 'text-primary' : 'text-foreground'}`}
              >
                Products
              </Link>
              <Link 
                to="/landing/spring-sale" 
                className={`hover:text-primary transition-colors ${location.pathname.includes('/landing') ? 'text-primary' : 'text-foreground'}`}
              >
                Sale
              </Link>
              <Link 
                to="/blog" 
                className={`hover:text-primary transition-colors ${location.pathname.includes('/blog') ? 'text-primary' : 'text-foreground'}`}
              >
                Blog
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden lg:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-9 w-64 bg-input-background border-transparent focus:border-primary"
                  />
                </div>
              </div>

              {/* Icons */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9 w-full bg-input-background border-transparent"
                />
              </div>
              <nav className="flex flex-col space-y-3">
                <Link to="/" className="py-2 hover:text-primary transition-colors">Home</Link>
                <Link to="/products" className="py-2 hover:text-primary transition-colors">Products</Link>
                <Link to="/landing/spring-sale" className="py-2 hover:text-primary transition-colors">Sale</Link>
                <Link to="/blog" className="py-2 hover:text-primary transition-colors">Blog</Link>
                <Link to="/admin" className="py-2 text-muted-foreground hover:text-primary transition-colors">Admin Dashboard</Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-foreground text-primary rounded-lg flex items-center justify-center">
                  <span className="font-semibold text-xl">L</span>
                </div>
                <span className="text-xl font-semibold">LUXE</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Premium cosmetics for your natural beauty
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><Link to="/products" className="hover:text-primary-foreground transition-colors">All Products</Link></li>
                <li><Link to="/products?category=skincare" className="hover:text-primary-foreground transition-colors">Skincare</Link></li>
                <li><Link to="/products?category=makeup" className="hover:text-primary-foreground transition-colors">Makeup</Link></li>
                <li><Link to="/products?category=fragrance" className="hover:text-primary-foreground transition-colors">Fragrance</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Subscribe for exclusive offers and updates
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
            <p>© 2026 LUXE Cosmetics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
