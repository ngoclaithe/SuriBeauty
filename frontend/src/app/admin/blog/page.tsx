"use client";

import { useEffect, useState, useCallback } from "react";
import { getBlogPosts, adminCreateBlogPost, adminUpdateBlogPost, adminDeleteBlogPost, type BlogPost } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { formatDate } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Loader2, X, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FileUpload from "@/components/admin/file-upload";
import Portal from "@/components/ui/portal";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/admin/rich-editor"), { ssr: false });

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function AdminBlogPage() {
  const token = useAuthStore((s) => s.token) || "";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Form
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", slug: "", content: "", excerpt: "", coverImage: "",
    published: false, tags: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    getBlogPosts(`page=${page}&limit=10`)
      .then((res) => { setPosts(res.data); setTotalPages(res.meta.totalPages); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ title: "", slug: "", content: "", excerpt: "", coverImage: "", published: false, tags: "" });
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title, slug: post.slug, content: post.content || "",
      excerpt: post.excerpt || "", coverImage: post.coverImage || "",
      published: post.published, tags: post.tags.join(", "),
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = {
        ...form,
        slug: form.slug || slugify(form.title),
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        coverImage: form.coverImage || undefined,
      };
      if (editingId) {
        await adminUpdateBlogPost(token, editingId, data);
      } else {
        await adminCreateBlogPost(token, data);
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
      await adminDeleteBlogPost(token, id);
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
          <h1 className="text-2xl font-bold">Quản lý Blog</h1>
          <p className="text-muted-foreground text-sm">Thêm, sửa, xóa bài viết</p>
        </div>
        <Button onClick={openCreate} className="bg-gradient-to-r from-primary to-rose-500 rounded-xl shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Viết bài mới
        </Button>
      </div>

      {/* Form Modal — Fullscreen */}
      {showForm && (
        <Portal>
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-border/50 bg-white shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowForm(false)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground"><X className="h-5 w-5" /></button>
              <h2 className="text-lg font-bold">{editingId ? "Sửa bài viết" : "Viết bài mới"}</h2>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Xuất bản</span>
              </label>
              <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Huỷ</Button>
              <Button onClick={handleSave} disabled={saving || !form.title} className="bg-gradient-to-r from-primary to-rose-500 rounded-xl">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {editingId ? "Cập nhật" : "Tạo mới"}
              </Button>
            </div>
          </div>

          {/* Content area — 2 pane */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: Editor */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-4">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })}
                  placeholder="Tiêu đề bài viết..."
                  className="w-full text-3xl font-bold border-0 outline-none placeholder:text-muted-foreground/40 bg-transparent"
                />
                <input
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Mô tả ngắn về bài viết..."
                  className="w-full text-base text-muted-foreground border-0 outline-none placeholder:text-muted-foreground/30 bg-transparent"
                />
                <RichTextEditor
                  content={form.content}
                  onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                />
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="w-80 border-l border-border/50 bg-muted/20 overflow-y-auto p-5 space-y-5 shrink-0 hidden lg:block">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Slug</label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="tieu-de-bai-viet" className="rounded-xl" />
              </div>

              <FileUpload
                value={form.coverImage ? [form.coverImage] : []}
                onChange={(urls) => setForm({ ...form, coverImage: urls[0] || "" })}
                multiple={false}
                accept="image/*"
                label="Ảnh bìa"
              />

              <div>
                <label className="text-sm font-medium mb-1.5 block">Tags</label>
                <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="skincare, tips" className="rounded-xl" />
                <p className="text-xs text-muted-foreground mt-1">Phân cách bằng dấu phẩy</p>
              </div>
            </div>
          </div>
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
            <p className="text-sm text-muted-foreground mb-6">Bạn có chắc muốn xoá bài viết này?</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl">Huỷ</Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteConfirm)} className="flex-1 rounded-xl">Xoá</Button>
            </div>
          </Card>
        </div>
        </Portal>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : (
        <Card className="border-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <th className="p-4">Bài viết</th>
                  <th className="p-4">Tác giả</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4">Ngày tạo</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {post.coverImage && (
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                            <Image src={post.coverImage} alt="" fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{post.title}</p>
                          {post.excerpt && <p className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{post.author?.name || "—"}</td>
                    <td className="p-4">
                      <Badge variant={post.published ? "default" : "secondary"} className="rounded-full text-xs">
                        {post.published ? "Đã đăng" : "Nháp"}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{formatDate(post.createdAt)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8" onClick={() => openEdit(post)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8 text-destructive" onClick={() => setDeleteConfirm(post.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t border-border/50">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button key={p} variant={page === p ? "default" : "outline"} size="sm" onClick={() => setPage(p)} className="rounded-lg">{p}</Button>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
