"use client";

import { useEffect, useState, useCallback } from "react";
import { adminGetOrders, adminUpdateOrderStatus, type Order } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { formatPrice, formatDateTime } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Loader2, X, Package, MapPin, Phone, User } from "lucide-react";
import Portal from "@/components/ui/portal";

const statusMap: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Chờ xác nhận", color: "bg-amber-50 text-amber-700 border-amber-200" },
  CONFIRMED: { label: "Đã xác nhận", color: "bg-blue-50 text-blue-700 border-blue-200" },
  SHIPPING: { label: "Đang giao", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  DELIVERED: { label: "Hoàn thành", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  CANCELLED: { label: "Đã huỷ", color: "bg-red-50 text-red-700 border-red-200" },
};

const statusFlow = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED"];

export default function AdminOrdersPage() {
  const token = useAuthStore((s) => s.token) || "";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", "20");
    if (filterStatus !== "all") params.set("status", filterStatus);
    adminGetOrders(token, params.toString())
      .then((res) => { setOrders(res.data); setTotalPages(res.meta.totalPages); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, page, filterStatus]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await adminUpdateOrderStatus(token, orderId, newStatus);
      fetchData();
      if (detailOrder?.id === orderId) {
        setDetailOrder({ ...detailOrder, status: newStatus });
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <p className="text-muted-foreground text-sm">Theo dõi và xử lý đơn hàng</p>
      </div>

      {/* Order Detail Modal */}
      {detailOrder && (
        <Portal>
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-y-auto">
          <Card className="w-full max-w-lg mx-4 p-6 border-0 shadow-2xl bg-white my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Chi tiết đơn #{detailOrder.id.slice(0, 8)}</h2>
              <button onClick={() => setDetailOrder(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${statusMap[detailOrder.status]?.color}`}>
                  {statusMap[detailOrder.status]?.label}
                </span>
                <select
                  value={detailOrder.status}
                  onChange={(e) => handleStatusChange(detailOrder.id, e.target.value)}
                  className="text-sm border rounded-lg px-2 py-1"
                  disabled={updatingId === detailOrder.id}
                >
                  {Object.entries(statusMap).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
              </div>

              {/* Customer info */}
              <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-muted-foreground" /> {detailOrder.shippingName || detailOrder.customer?.name}</div>
                {detailOrder.shippingPhone && <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /> {detailOrder.shippingPhone}</div>}
                {detailOrder.shippingAddress && <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> {detailOrder.shippingAddress}</div>}
              </div>

              {/* Items */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Sản phẩm</h4>
                <div className="space-y-2">
                  {detailOrder.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{item.product?.name || "Sản phẩm"}</p>
                          {item.variant && <p className="text-xs text-muted-foreground">{item.variant.name}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                        <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t font-semibold">
                <span>Tổng tiền</span>
                <span className="text-primary text-lg">{formatPrice(detailOrder.totalAmount)}</span>
              </div>
            </div>
          </Card>
        </div>
        </Portal>
      )}

      <Card className="border-0 shadow-sm">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-3">
          <Select value={filterStatus} onValueChange={(v) => { if (v) { setFilterStatus(v); setPage(1); } }}>
            <SelectTrigger className="w-44 rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="PENDING">Chờ xác nhận</SelectItem>
              <SelectItem value="CONFIRMED">Đã xác nhận</SelectItem>
              <SelectItem value="SHIPPING">Đang giao</SelectItem>
              <SelectItem value="DELIVERED">Hoàn thành</SelectItem>
              <SelectItem value="CANCELLED">Đã huỷ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <th className="p-4">Mã đơn</th>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Tổng tiền</th>
                  <th className="p-4">Sản phẩm</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4">Ngày đặt</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-sm font-medium">#{order.id.slice(0, 8)}</td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{order.shippingName || order.customer?.name}</p>
                      <p className="text-xs text-muted-foreground">{order.shippingPhone || order.customer?.phone}</p>
                    </td>
                    <td className="p-4 font-semibold text-sm">{formatPrice(order.totalAmount)}</td>
                    <td className="p-4 text-sm">{order.items?.length || 0} sp</td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={updatingId === order.id}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer ${statusMap[order.status]?.color}`}
                      >
                        {Object.entries(statusMap).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{formatDateTime(order.createdAt)}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8" onClick={() => setDetailOrder(order)}>
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
