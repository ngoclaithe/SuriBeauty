"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getProducts, getCategories, getBlogPosts } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { Package, FolderTree, ShoppingCart, Users, TrendingUp, DollarSign, Eye, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0, categories: 0, posts: 0, revenue: 0,
  });

  useEffect(() => {
    Promise.all([
      getProducts("limit=1"),
      getCategories(),
      getBlogPosts("limit=1"),
    ]).then(([products, categories, posts]) => {
      setStats({
        products: products.meta.total,
        categories: categories.length,
        posts: posts.meta.total,
        revenue: 15800000,
      });
    }).catch(console.error);
  }, []);

  const cards = [
    { title: "Tổng sản phẩm", value: stats.products, icon: Package, color: "from-blue-500 to-blue-600", change: "+12%" },
    { title: "Danh mục", value: stats.categories, icon: FolderTree, color: "from-emerald-500 to-emerald-600", change: "+2" },
    { title: "Bài viết", value: stats.posts, icon: FileText, color: "from-amber-500 to-amber-600", change: "+3" },
    { title: "Doanh thu tháng", value: formatPrice(stats.revenue), icon: DollarSign, color: "from-primary to-rose-500", change: "+25%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Tổng quan hoạt động kinh doanh</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Card key={i} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-md`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{card.change}</span>
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{card.title}</p>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-0 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Đơn hàng gần đây</h3>
          <div className="space-y-4">
            {[
              { id: "#0001", customer: "Ngọc Trinh", amount: 1560000, status: "Đang giao" },
              { id: "#0002", customer: "Thu Hà", amount: 780000, status: "Hoàn thành" },
              { id: "#0003", customer: "Mai Anh", amount: 2340000, status: "Chờ xác nhận" },
              { id: "#0004", customer: "Lan Phương", amount: 950000, status: "Đang giao" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {order.customer[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatPrice(order.amount)}</p>
                  <p className={`text-xs ${order.status === "Hoàn thành" ? "text-emerald-600" : order.status === "Chờ xác nhận" ? "text-amber-600" : "text-blue-600"}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Sản phẩm bán chạy</h3>
          <div className="space-y-4">
            {[
              { name: "Serum Vitamin C Rạng Rỡ", sold: 156, revenue: 121680000 },
              { name: "Son Lì Velvet Matte", sold: 243, revenue: 77760000 },
              { name: "Kem Dưỡng Ban Đêm Luxury", sold: 89, revenue: 84550000 },
              { name: "Nước Hoa Noir Eau de Parfum", sold: 67, revenue: 83750000 },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-muted rounded-lg flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sold} đã bán</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">{formatPrice(product.revenue)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
