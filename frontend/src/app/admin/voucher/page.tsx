"use client";

import { useEffect, useState, useCallback } from "react";
import { adminGetVouchers, adminCreateVoucher, adminUpdateVoucher, adminDeleteVoucher } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { formatPrice, formatDate } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Ticket, Copy, Loader2, X, Save } from "lucide-react";
import Portal from "@/components/ui/portal";

export default function AdminVoucherPage() {
  const token = useAuthStore((s) => s.token) || "";
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    code: "", discountType: "PERCENTAGE", discountValue: 10,
    minOrderValue: 0, maxDiscount: 0, usageLimit: 100, isActive: true, expiredAt: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    adminGetVouchers(token)
      .then(setVouchers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ code: "", discountType: "PERCENTAGE", discountValue: 10, minOrderValue: 0, maxDiscount: 0, usageLimit: 100, isActive: true, expiredAt: "" });
    setShowForm(true);
  };

  const openEdit = (v: any) => {
    setEditingId(v.id);
    setForm({
      code: v.code, discountType: v.discountType, discountValue: v.discountValue,
      minOrderValue: v.minOrderValue || 0, maxDiscount: v.maxDiscount || 0,
      usageLimit: v.usageLimit || 100, isActive: v.isActive,
      expiredAt: v.expiredAt ? new Date(v.expiredAt).toISOString().split("T")[0] : "",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = {
        ...form,
        discountValue: Number(form.discountValue),
        minOrderValue: Number(form.minOrderValue) || undefined,
        maxDiscount: Number(form.maxDiscount) || undefined,
        usageLimit: Number(form.usageLimit) || undefined,
        expiredAt: form.expiredAt ? new Date(form.expiredAt).toISOString() : undefined,
      };
      if (editingId) {
        await adminUpdateVoucher(token, editingId, data);
      } else {
        await adminCreateVoucher(token, data);
      }
      setShowForm(false);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminDeleteVoucher(token, id);
      setDeleteConfirm(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Voucher</h1>
          <p className="text-muted-foreground text-sm">Tạo, sửa, xóa mã giảm giá</p>
        </div>
        <Button onClick={openCreate} className="bg-gradient-to-r from-primary to-rose-500 rounded-xl shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Tạo voucher
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <Portal>
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
          <Card className="w-full max-w-md mx-4 p-6 border-0 shadow-2xl bg-white my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Sửa voucher" : "Tạo voucher mới"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Mã voucher *</label>
                <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="WELCOME10" className="rounded-xl font-mono" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Loại giảm</label>
                  <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                    <option value="PERCENTAGE">Phần trăm (%)</option>
                    <option value="FIXED">Số tiền cố định</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Giá trị giảm *</label>
                  <Input type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })} className="rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Đơn tối thiểu</label>
                  <Input type="number" value={form.minOrderValue} onChange={(e) => setForm({ ...form, minOrderValue: Number(e.target.value) })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Giảm tối đa</label>
                  <Input type="number" value={form.maxDiscount} onChange={(e) => setForm({ ...form, maxDiscount: Number(e.target.value) })} className="rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Giới hạn sử dụng</label>
                  <Input type="number" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Ngày hết hạn</label>
                  <Input type="date" value={form.expiredAt} onChange={(e) => setForm({ ...form, expiredAt: e.target.value })} className="rounded-xl" />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Đang hoạt động</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Huỷ</Button>
              <Button onClick={handleSave} disabled={saving || !form.code} className="bg-gradient-to-r from-primary to-rose-500 rounded-xl">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {editingId ? "Cập nhật" : "Tạo mới"}
              </Button>
            </div>
          </Card>
        </div>
        </Portal>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <Portal>
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-sm mx-4 p-6 border-0 shadow-2xl text-center">
            <Trash2 className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-1">Xác nhận xoá</h3>
            <p className="text-sm text-muted-foreground mb-6">Bạn có chắc muốn xoá voucher này?</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl">Huỷ</Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteConfirm)} className="flex-1 rounded-xl">Xoá</Button>
            </div>
          </Card>
        </div>
        </Portal>
      )}

      {/* Cards */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : vouchers.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Ticket className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>Chưa có voucher nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vouchers.map((voucher: any) => (
            <Card key={voucher.id} className="p-6 border-0 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-rose-100 rounded-xl flex items-center justify-center">
                    <Ticket className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold font-mono text-lg">{voucher.code}</h3>
                      <button onClick={() => copyCode(voucher.code)} className="text-muted-foreground hover:text-primary transition-colors"><Copy className="h-4 w-4" /></button>
                    </div>
                    <Badge variant={voucher.isActive ? "default" : "secondary"} className="rounded-full text-xs mt-1">
                      {voucher.isActive ? "Đang hoạt động" : "Tạm dừng"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Giảm giá</span>
                  <span className="font-semibold">{voucher.discountType === "PERCENTAGE" ? `${voucher.discountValue}%` : formatPrice(voucher.discountValue)}</span>
                </div>
                {voucher.minOrderValue > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Đơn tối thiểu</span>
                    <span>{formatPrice(voucher.minOrderValue)}</span>
                  </div>
                )}
                {voucher.maxDiscount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Giảm tối đa</span>
                    <span>{formatPrice(voucher.maxDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Đã dùng</span>
                  <span>{voucher.usedCount}/{voucher.usageLimit || "∞"}</span>
                </div>
                {voucher.expiredAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hết hạn</span>
                    <span>{formatDate(voucher.expiredAt)}</span>
                  </div>
                )}
              </div>

              {voucher.usageLimit && (
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-primary to-rose-500 h-2 rounded-full transition-all" style={{ width: `${Math.min((voucher.usedCount / voucher.usageLimit) * 100, 100)}%` }} />
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 rounded-lg" onClick={() => openEdit(voucher)}><Edit className="mr-1.5 h-3.5 w-3.5" /> Sửa</Button>
                <Button variant="outline" size="sm" className="rounded-lg text-destructive" onClick={() => setDeleteConfirm(voucher.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
