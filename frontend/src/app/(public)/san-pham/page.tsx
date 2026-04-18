"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductImage } from "@/components/ui/product-image";
import { useRouter } from "next/navigation";
import { getProducts, getCategories, type Product, type Category } from "@/lib/api";
import { formatPrice, calcDiscount } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Heart, ShoppingCart, SlidersHorizontal, Grid3X3, LayoutList, Star, Loader2, Zap } from "lucide-react";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedCategory !== "all") params.set("categoryId", selectedCategory);
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", String(page));
    params.set("limit", "12");

    getProducts(params.toString())
      .then((res) => {
        setProducts(res.data);
        setTotalPages(res.meta.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, selectedCategory, sortBy, sortOrder, page]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0] || "",
      price: product.price,
      quantity: 1,
      slug: product.slug,
    });
  };

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0] || "",
      price: product.price,
      quantity: 1,
      slug: product.slug,
    });
    router.push("/thanh-toan");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Sản phẩm <span className="font-heading italic text-primary">của chúng tôi</span>
        </h1>
        <p className="text-muted-foreground text-lg">Khám phá bộ sưu tập mỹ phẩm cao cấp</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-5 bg-card rounded-2xl border border-border/50 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 rounded-xl bg-muted/40 border-transparent focus:border-primary/30"
          />
        </div>

        <Select value={selectedCategory} onValueChange={(v) => { setSelectedCategory(v ?? "all"); setPage(1); }}>
          <SelectTrigger className="w-full md:w-48 rounded-xl">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={`${sortBy}-${sortOrder}`} onValueChange={(v) => { if (!v) return; const [s, o] = v.split("-"); setSortBy(s); setSortOrder(o as "asc" | "desc"); setPage(1); }}>
          <SelectTrigger className="w-full md:w-48 rounded-xl">
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt-desc">Mới nhất</SelectItem>
            <SelectItem value="price-asc">Giá thấp → cao</SelectItem>
            <SelectItem value="price-desc">Giá cao → thấp</SelectItem>
            <SelectItem value="name-asc">Tên A → Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Badge
          variant={selectedCategory === "all" ? "default" : "outline"}
          className="cursor-pointer px-4 py-1.5 rounded-full text-sm"
          onClick={() => { setSelectedCategory("all"); setPage(1); }}
        >
          Tất cả
        </Badge>
        {categories.map((cat) => (
          <Badge
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            className="cursor-pointer px-4 py-1.5 rounded-full text-sm"
            onClick={() => { setSelectedCategory(cat.id); setPage(1); }}
          >
            {cat.name}
          </Badge>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const discount = calcDiscount(product.price, product.comparePrice);
            return (
              <Link key={product.id} href={`/san-pham/${product.slug}`}>
                <Card className="overflow-hidden group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    {product.images[0] ? (
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <ProductImage
                        src={undefined}
                        alt={product.name}
                        className="object-cover"
                      />
                    )}
                    {product.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full">
                        +{product.images.length - 1} ảnh
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        -{discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary/70 font-medium mb-1.5">{product.category?.name || "Sản phẩm"}</p>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-base font-bold text-primary">{formatPrice(product.price)}</span>
                      {product.comparePrice && (
                        <span className="text-xs text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
                      )}
                      {product.variants.length > 0 && (
                        <span className="text-xs text-muted-foreground ml-auto">{product.variants.length} loại</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Thêm giỏ hàng
                      </button>
                      <button
                        onClick={(e) => handleBuyNow(e, product)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg bg-gradient-to-r from-primary to-rose-500 text-white hover:opacity-90 transition-opacity shadow-sm"
                      >
                        <Zap className="h-3.5 w-3.5" />
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={page === p ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(p)}
              className="rounded-xl min-w-10"
            >
              {p}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
