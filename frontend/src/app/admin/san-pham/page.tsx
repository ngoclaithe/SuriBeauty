"use client";

import { useEffect, useState, useCallback } from "react";
import { getProducts, getCategories, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, type Product, type Category } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { formatPrice } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Loader2, Eye, X, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FileUpload from "@/components/admin/file-upload";
import Portal from "@/components/ui/portal";

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

const emptyVariant = { name: "", price: 0, sku: "" };
const emptyForm = { name: "", slug: "", description: "", price: 0, comparePrice: 0, categoryId: "", status: "ACTIVE", featured: false, images: [""], tags: "", variants: [] as { name: string; price: number; sku: string }[] };

export default function AdminProductsPage() {
  const token = useAuthStore((s) => s.token) || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", String(page));
    params.set("limit", "10");
    Promise.all([getProducts(params.toString()), getCategories()])
      .then(([res, cats]) => { setProducts(res.data); setTotalPages(res.meta.totalPages); setCategories(cats); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name, slug: p.slug, description: p.description || "",
      price: p.price, comparePrice: p.comparePrice || 0,
      categoryId: p.categoryId || "", status: p.status,
      featured: p.featured, images: p.images.length ? p.images : [""],
      tags: p.tags.join(", "),
      variants: p.variants.map((v: any) => ({ name: v.name, price: v.price, sku: v.sku || "" })),
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = {
        ...form,
        slug: form.slug || slugify(form.name),
        price: Number(form.price),
        comparePrice: Number(form.comparePrice) || undefined,
        images: (form.images as string[]).filter(Boolean),
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        categoryId: form.categoryId || undefined,
        variants: form.variants.filter((v) => v.name).map((v) => ({ name: v.name, price: Number(v.price), sku: v.sku || undefined })),
      };
      if (editingId) {
        await adminUpdateProduct(token, editingId, data);
      } else {
        await adminCreateProduct(token, data);
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
      await adminDeleteProduct(token, id);
      setDeleteConfirm(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground text-sm">Thêm, sửa, xóa sản phẩm</p>
        </div>
        <Button onClick={openCreate} className="bg-gradient-to-r from-primary to-rose-500 rounded-xl shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      {/* ─── Form Modal ─── */}
      {showForm && (
        <Portal>
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-y-auto">
          <Card className="w-full max-w-2xl mx-4 p-6 border-0 shadow-2xl bg-white my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Tên sản phẩm *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })} placeholder="Kem dưỡng da..." className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Slug</label>
                  <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="kem-duong-da" className="rounded-xl" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Mô tả</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" placeholder="Mô tả sản phẩm..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Giá bán *</label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Giá so sánh</label>
                  <Input type="number" value={form.comparePrice} onChange={(e) => setForm({ ...form, comparePrice: Number(e.target.value) })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Danh mục</label>
                  <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                    <option value="">Chọn danh mục</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Trạng thái</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                    <option value="ACTIVE">Đang bán</option>
                    <option value="DRAFT">Nháp</option>
                    <option value="ARCHIVED">Lưu trữ</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded" />
                    <span className="text-sm font-medium">Sản phẩm nổi bật</span>
                  </label>
                </div>
              </div>

              <FileUpload
                value={form.images as string[]}
                onChange={(urls) => setForm({ ...form, images: urls })}
              />

              <div>
                <label className="text-sm font-medium mb-1 block">Tags (phân cách bằng dấu phẩy)</label>
                <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="serum, vitamin-c, duong-sang" className="rounded-xl" />
              </div>

              {/* Variants */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Biến thể sản phẩm</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setForm({ ...form, variants: [...form.variants, { ...emptyVariant }] })}
                    className="rounded-lg text-xs"
                  >
                    + Thêm biến thể
                  </Button>
                </div>
                {form.variants.length === 0 ? (
                  <p className="text-xs text-muted-foreground bg-muted/30 rounded-xl p-3 text-center">Chưa có biến thể. Nhấn "Thêm biến thể" để tạo các phiên bản khác nhau (size, màu sắc...).</p>
                ) : (
                  <div className="space-y-2">
                    {form.variants.map((v, i) => (
                      <div key={i} className="grid grid-cols-[1fr_100px_120px_32px] gap-2 items-center">
                        <Input
                          value={v.name}
                          onChange={(e) => { const vs = [...form.variants]; vs[i] = { ...vs[i], name: e.target.value }; setForm({ ...form, variants: vs }); }}
                          placeholder="Tên (VD: 30ml, Màu Hồng)"
                          className="rounded-lg text-sm"
                        />
                        <Input
                          type="number"
                          value={v.price}
                          onChange={(e) => { const vs = [...form.variants]; vs[i] = { ...vs[i], price: Number(e.target.value) }; setForm({ ...form, variants: vs }); }}
                          placeholder="Giá"
                          className="rounded-lg text-sm"
                        />
                        <Input
                          value={v.sku}
                          onChange={(e) => { const vs = [...form.variants]; vs[i] = { ...vs[i], sku: e.target.value }; setForm({ ...form, variants: vs }); }}
                          placeholder="SKU"
                          className="rounded-lg text-sm"
                        />
                        <button
                          onClick={() => setForm({ ...form, variants: form.variants.filter((_, j) => j !== i) })}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Huỷ</Button>
              <Button onClick={handleSave} disabled={saving || !form.name || !form.price} className="bg-gradient-to-r from-primary to-rose-500 rounded-xl">
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
            <p className="text-sm text-muted-foreground mb-6">Bạn có chắc muốn xoá sản phẩm này?</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl">Huỷ</Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteConfirm)} className="flex-1 rounded-xl">Xoá</Button>
            </div>
          </Card>
        </div>
        </Portal>
      )}

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <div className="p-4 border-b border-border/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm sản phẩm..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9 rounded-xl" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <th className="p-4">Sản phẩm</th>
                  <th className="p-4">Giá bán</th>
                  <th className="p-4">Danh mục</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4">Biến thể</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                          {product.images[0] && <Image src={product.images[0]} alt="" fill className="object-cover" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
                      {product.comparePrice && <span className="block text-xs text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>}
                    </td>
                    <td className="p-4"><span className="text-sm">{product.category?.name || "—"}</span></td>
                    <td className="p-4">
                      <Badge variant={product.status === "ACTIVE" ? "default" : "secondary"} className="rounded-full text-xs">
                        {product.status === "ACTIVE" ? "Đang bán" : product.status === "DRAFT" ? "Nháp" : "Lưu trữ"}
                      </Badge>
                    </td>
                    <td className="p-4"><span className="text-sm">{product.variants.length}</span></td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/san-pham/${product.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8" onClick={() => openEdit(product)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8 text-destructive" onClick={() => setDeleteConfirm(product.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
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
