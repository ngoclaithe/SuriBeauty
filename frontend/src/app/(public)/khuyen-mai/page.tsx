"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductImage } from "@/components/ui/product-image";
import { getProducts, type Product } from "@/lib/api";
import { formatPrice, calcDiscount } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Percent, Loader2, Sparkles, Clock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromotionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    getProducts("limit=20")
      .then((res) => {
        const discounted = res.data.filter((p) => p.comparePrice && p.comparePrice > p.price);
        setProducts(discounted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Banner */}
      <section className="bg-gradient-to-r from-primary via-rose-600 to-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PC9zdmc+')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Ưu đãi đặc biệt</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Khuyến Mãi Hot</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Giảm giá lên đến 50% cho các sản phẩm mỹ phẩm cao cấp. Đừng bỏ lỡ cơ hội!
          </p>
          <div className="flex justify-center gap-8">
            {[
              { icon: Percent, text: "Giảm đến 50%" },
              { icon: Gift, text: "Quà tặng kèm" },
              { icon: Clock, text: "Có hạn" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voucher Codes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { code: "WELCOME10", desc: "Giảm 10% cho đơn hàng đầu tiên", min: "Đơn tối thiểu 500K" },
            { code: "SURI50K", desc: "Giảm ngay 50.000₫", min: "Đơn tối thiểu 300K" },
          ].map((v) => (
            <Card key={v.code} className="p-5 flex items-center gap-4 border-0 shadow-md bg-white">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-rose-100 rounded-xl flex items-center justify-center shrink-0">
                <Percent className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{v.desc}</p>
                <p className="text-xs text-muted-foreground">{v.min}</p>
              </div>
              <div className="text-right shrink-0">
                <Badge variant="outline" className="font-mono font-bold text-primary border-primary/30 rounded-lg px-3 py-1">{v.code}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Discounted Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold mb-8">
          Sản phẩm <span className="font-heading italic text-primary">giảm giá</span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Chưa có sản phẩm khuyến mãi</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const discount = calcDiscount(product.price, product.comparePrice);
              return (
                <Link key={product.id} href={`/san-pham/${product.slug}`}>
                  <Card className="overflow-hidden group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <ProductImage src={product.images[0]} alt={product.name} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          -{discount}%
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-3 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addItem({ productId: product.id, name: product.name, image: product.images[0] || "", price: product.price, quantity: 1, slug: product.slug });
                          }}
                          className="flex-1 mr-2 bg-white/95 backdrop-blur-sm text-foreground rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors shadow-md"
                        >
                          <ShoppingCart className="h-4 w-4" /> Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-primary/70 font-medium mb-1.5">{product.category?.name}</p>
                      <h3 className="font-semibold text-sm mb-3 line-clamp-1">{product.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.comparePrice && (
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
