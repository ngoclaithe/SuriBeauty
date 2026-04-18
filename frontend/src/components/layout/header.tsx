"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, User, Heart, Phone, Mail, ChevronRight, Facebook, Instagram } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";

const navItems = [
  { label: "Trang chủ", path: "/" },
  { label: "Sản phẩm", path: "/san-pham" },
  { label: "Khuyến mãi", path: "/khuyen-mai" },
  { label: "Blog", path: "/blog" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.length;
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/san-pham?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-[#1a1a2e] text-white/80 py-2 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center gap-6">
              <a href="tel:0901234567" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="h-3 w-3" />
                <span>0901 234 567</span>
              </a>
              <a href="mailto:info@suri.vn" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="h-3 w-3" />
                <span>info@suri.vn</span>
              </a>
            </div>
            <p className="text-center flex-1 md:flex-none">
              ✨ Miễn phí vận chuyển cho đơn từ 500.000₫
            </p>
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook className="h-3.5 w-3.5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-[#1a1a2e]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-gradient-to-r from-[#1a1a2e] via-[#2d1b3d] to-[#1a1a2e]"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo - Pure CSS text */}
            <Link href="/" className="shrink-0 group flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-wider text-white font-heading group-hover:opacity-80 transition-opacity">
                SURI
              </span>
              <span className="text-[9px] text-rose-300/70 tracking-[0.2em] uppercase font-medium">
                수리
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 ${isActive(item.path)
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                    }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-gradient-to-r from-rose-400 to-pink-400 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>

              <Link href="#" className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <User className="h-[18px] w-[18px]" />
              </Link>

              <Link href="#" className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <Heart className="h-[18px] w-[18px]" />
              </Link>

              <Link href="/gio-hang" className="relative w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <ShoppingCart className="h-[18px] w-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-br from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-[#1a1a2e] border-white/10 p-0 text-white">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <div className="p-6 space-y-8">
                    <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-baseline gap-1">
                      <span className="text-xl font-bold tracking-wider font-heading">SURI</span>
                      <span className="text-[8px] text-rose-300/70 tracking-[0.15em] uppercase">수리</span>
                    </Link>
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <input
                          placeholder="Tìm kiếm..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-rose-400/50 text-sm"
                        />
                      </div>
                    </form>
                    <nav className="flex flex-col gap-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors text-sm ${isActive(item.path)
                              ? "bg-white/10 text-white"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <ChevronRight className="h-4 w-4 opacity-40" />
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Search Bar Expanded */}
        {searchOpen && (
          <div className="border-t border-white/10 py-4 px-4 bg-[#1a1a2e]/95 backdrop-blur-xl">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                autoFocus
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-rose-400/50"
              />
            </form>
          </div>
        )}
      </header>
    </>
  );
}
