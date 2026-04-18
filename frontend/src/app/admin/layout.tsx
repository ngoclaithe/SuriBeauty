"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, FileText, Ticket,
  LogOut, ChevronLeft, ChevronRight, Menu, X, Bell,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Sản phẩm", path: "/admin/san-pham", icon: Package },
  { label: "Danh mục", path: "/admin/danh-muc", icon: FolderTree },
  { label: "Đơn hàng", path: "/admin/don-hang", icon: ShoppingCart },
  { label: "Khách hàng", path: "/admin/khach-hang", icon: Users },
  { label: "Blog", path: "/admin/blog", icon: FileText },
  { label: "Voucher", path: "/admin/voucher", icon: Ticket },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, logout, isAuthenticated } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !isAuthenticated()) {
      router.replace("/admin/dang-nhap");
    }
  }, [mounted, token, router, isAuthenticated]);

  // Don't render layout for login page
  if (pathname === "/admin/dang-nhap") {
    return <>{children}</>;
  }

  // Don't show anything until auth check is done
  if (!mounted || !isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    router.replace("/admin/dang-nhap");
  };

  const currentPage = sidebarItems.find((item) => isActive(item.path))?.label || "Dashboard";

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 h-screen bg-white border-r border-border/50 flex flex-col shadow-sm transition-all duration-300 ${collapsed ? "w-[72px]" : "w-64"
          } ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo + collapse */}
        <div className={`p-4 border-b border-border/50 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          <Link href="/admin" className="flex items-baseline gap-1 overflow-hidden">
            <span className="font-heading text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent shrink-0">
              SURI
            </span>
            {!collapsed && (
              <span className="text-xs text-muted-foreground font-medium">Admin</span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-7 h-7 items-center justify-center rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted/50 text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${collapsed ? "justify-center px-2 py-2.5" : "px-4 py-2.5"
                  } ${active
                    ? "bg-gradient-to-r from-primary to-rose-500 text-white shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom link */}
        <div className="p-3 border-t border-border/50">
          <Link
            href="/"
            className={`flex items-center gap-3 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors ${collapsed ? "justify-center px-2 py-2.5" : "px-4 py-2.5"
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
            {!collapsed && <span>Về trang chủ</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-border/50 px-4 md:px-6 py-3 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted/50 text-muted-foreground"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-lg font-semibold">{currentPage}</h2>
                <p className="text-xs text-muted-foreground hidden sm:block">Quản trị SURI Beauty</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted/50 text-muted-foreground relative">
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
              <div className="hidden sm:flex items-center gap-2 border-l pl-3 border-border/50">
                <div className="w-9 h-9 bg-gradient-to-br from-primary/10 to-rose-100 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                  {user?.name?.[0] || "A"}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium leading-none">{user?.name || "Admin"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Đăng xuất"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
              >
                <LogOut className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
