"use client";

import { useEffect, useState, useCallback } from "react";
import { getCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory, type Category } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, FolderTree, Loader2, X, Save } from "lucide-react";
import Image from "next/image";
import FileUpload from "@/components/admin/file-upload";
import Portal from "@/components/ui/portal";

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function AdminCategoriesPage() {
  const token = useAuthStore((s) => s.token) || "";
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", image: "" });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: "", slug: "", image: "" });
    setShowForm(true);
  };

  const openEdit = (cat: Category) => {
    setEditingId(cat.id);
    setForm({ name: cat.name, slug: cat.slug, image: cat.image || "" });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...form, slug: form.slug || slugify(form.name), image: form.image || undefined };
      if (editingId) {
        await adminUpdateCategory(token, editingId, data);
      } else {
        await adminCreateCategory(token, data);
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
      await adminDeleteCategory(token, id);
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
          <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
          <p className="text-muted-foreground text-sm">Thêm, sửa, xóa danh mục sản phẩm</p>
        </div>
        <Button onClick={openCreate} className="bg-gradient-to-r from-primary to-rose-500 rounded-xl shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Thêm danh mục
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <Portal>
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4 p-6 border-0 shadow-2xl bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Sửa danh mục" : "Thêm danh mục mới"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Tên danh mục *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })} placeholder="Chăm sóc da" className="rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Slug</label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="cham-soc-da" className="rounded-xl" />
              </div>
              <FileUpload
                value={form.image ? [form.image] : []}
                onChange={(urls) => setForm({ ...form, image: urls[0] || "" })}
                multiple={false}
                accept="image/*"
                label="Ảnh danh mục"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Huỷ</Button>
              <Button onClick={handleSave} disabled={saving || !form.name} className="bg-gradient-to-r from-primary to-rose-500 rounded-xl">
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
            <p className="text-sm text-muted-foreground mb-6">Xoá danh mục này sẽ ảnh hưởng đến sản phẩm liên quan.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl">Huỷ</Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteConfirm)} className="flex-1 rounded-xl">Xoá</Button>
            </div>
          </Card>
        </div>
        </Portal>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Card key={cat.id} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {cat.image ? (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-rose-100 flex items-center justify-center shrink-0">
                    <FolderTree className="h-7 w-7 text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">/{cat.slug}</p>
                  <Badge variant="secondary" className="mt-2 rounded-full text-xs">
                    {cat._count?.products || 0} sản phẩm
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                <Button variant="outline" size="sm" className="flex-1 rounded-lg" onClick={() => openEdit(cat)}><Edit className="mr-1.5 h-3.5 w-3.5" /> Sửa</Button>
                <Button variant="outline" size="sm" className="rounded-lg text-destructive" onClick={() => setDeleteConfirm(cat.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
