"use client";

import { useEffect, useState, useCallback } from "react";
import { adminGetCustomers, adminGetCustomerById } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { formatPrice, formatDate } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Loader2, X, Mail, Phone, MapPin, ShoppingCart, Users } from "lucide-react";
import Portal from "@/components/ui/portal";

export default function AdminCustomersPage() {
  const token = useAuthStore((s) => s.token) || "";
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [detail, setDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", "20");
    if (search) params.set("search", search);
    adminGetCustomers(token, params.toString())
      .then((res) => { setCustomers(res.data); setTotalPages(res.meta.totalPages); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const viewDetail = async (id: string) => {
    setDetailLoading(true);
    try {
      const data = await adminGetCustomerById(token, id);
      setDetail(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
        <p className="text-muted-foreground text-sm">Danh sách và chi tiết khách hàng</p>
      </div>

      {/* Detail Modal */}
      {detail && (
        <Portal>
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-y-auto">
          <Card className="w-full max-w-md mx-4 p-6 border-0 shadow-2xl bg-white my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Chi tiết khách hàng</h2>
              <button onClick={() => setDetail(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-rose-100 rounded-full flex items-center justify-center text-xl font-bold text-primary">
                  {detail.name?.[0] || "K"}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{detail.name}</h3>
                  <p className="text-sm text-muted-foreground">Khách hàng từ {formatDate(detail.createdAt)}</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                {detail.email && <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /> {detail.email}</div>}
                {detail.phone && <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /> {detail.phone}</div>}
                {detail.address && <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> {detail.address}</div>}
              </div>

              {detail.orders && detail.orders.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><ShoppingCart className="h-4 w-4" /> Đơn hàng ({detail.orders.length})</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {detail.orders.map((order: any) => (
                      <div key={order.id} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">#{order.id.slice(0, 8)}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{formatPrice(order.totalAmount)}</p>
                          <p className="text-xs text-muted-foreground">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detail.note && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Ghi chú</h4>
                  <p className="text-sm text-muted-foreground bg-muted/20 rounded-lg p-3">{detail.note}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        </Portal>
      )}

      <Card className="border-0 shadow-sm">
        <div className="p-4 border-b border-border/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm khách hàng..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9 rounded-xl" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : customers.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Chưa có khách hàng nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Liên hệ</th>
                  <th className="p-4">Đơn hàng</th>
                  <th className="p-4">Ngày tạo</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((cust: any) => (
                  <tr key={cust.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-rose-100 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                          {cust.name?.[0] || "K"}
                        </div>
                        <span className="font-medium text-sm">{cust.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        {cust.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{cust.phone}</span>}
                        {cust.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{cust.email}</span>}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium">{cust._count?.orders ?? cust.orders?.length ?? 0}</td>
                    <td className="p-4 text-sm text-muted-foreground">{formatDate(cust.createdAt)}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8" onClick={() => viewDetail(cust.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t border-border/50">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button key={p} variant={page === p ? "default" : "outline"} size="sm" onClick={() => setPage(p)} className="rounded-lg">{p}</Button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
