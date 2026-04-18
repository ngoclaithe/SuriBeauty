"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, type Product } from "@/lib/api";
import { formatPrice, calcDiscount } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart, Minus, Plus, Star, ChevronRight, Truck, Shield, RotateCcw, Loader2, Check, Zap, Play } from "lucide-react";

function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getProductBySlug(slug)
        .then((p) => {
          setProduct(p);
          if (p.variants.length > 0) setSelectedVariant(p.variants[0].id);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    const variant = product.variants.find((v) => v.id === selectedVariant);
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0] || "",
      price: variant?.price || product.price,
      quantity,
      variantId: variant?.id,
      variantName: variant?.name,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    const variant = product.variants.find((v) => v.id === selectedVariant);
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0] || "",
      price: variant?.price || product.price,
      quantity,
      variantId: variant?.id,
      variantName: variant?.name,
      slug: product.slug,
    });
    router.push("/thanh-toan");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-40">
        <p className="text-xl text-muted-foreground mb-4">Sản phẩm không tồn tại</p>
        <Link href="/san-pham"><Button>Quay lại cửa hàng</Button></Link>
      </div>
    );
  }

  const discount = calcDiscount(product.price, product.comparePrice);
  const activeVariant = product.variants.find((v) => v.id === selectedVariant);
  const displayPrice = activeVariant?.price || product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/san-pham" className="hover:text-primary transition-colors">Sản phẩm</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image / Video Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-md">
            {product.images[selectedImage] && (
              isVideo(product.images[selectedImage]) ? (
                <video
                  src={product.images[selectedImage]}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              )
            )}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-rose-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                -{discount}%
              </div>
            )}
            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {selectedImage + 1} / {product.images.length}
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${selectedImage === i ? "border-primary shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                >
                  {isVideo(item) ? (
                    <>
                      <video src={item} className="w-full h-full object-cover" muted />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-5 w-5 text-white fill-white" />
                      </div>
                    </>
                  ) : (
                    <Image src={item} alt="" fill sizes="80px" className="object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {product.category && (
            <Badge variant="secondary" className="rounded-full px-4 py-1">{product.category.name}</Badge>
          )}

          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(128 đánh giá)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">{formatPrice(displayPrice)}</span>
            {product.comparePrice && (
              <span className="text-lg text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
            )}
            {discount > 0 && (
              <Badge className="bg-gradient-to-r from-primary to-rose-500 text-white rounded-full">Giảm {discount}%</Badge>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-3 block">Lựa chọn</label>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.id)}
                    className={`px-5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${selectedVariant === v.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50"
                      }`}
                  >
                    {v.name} - {formatPrice(v.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-muted/50 rounded-l-xl transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-5 font-semibold text-lg min-w-[48px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-muted/50 rounded-r-xl transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={added}
              variant="outline"
              className="flex-1 rounded-xl text-base border-primary/30 text-primary hover:bg-primary/5"
            >
              {added ? (
                <><Check className="mr-2 h-5 w-5" /> Đã thêm vào giỏ</>
              ) : (
                <><ShoppingCart className="mr-2 h-5 w-5" /> Thêm giỏ hàng</>
              )}
            </Button>

            <Button size="lg" variant="outline" className="rounded-xl px-4">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Buy Now */}
          <Button
            size="lg"
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-primary to-rose-500 rounded-xl text-base shadow-lg hover:shadow-xl transition-shadow"
          >
            <Zap className="mr-2 h-5 w-5" /> Mua ngay
          </Button>

          {/* Trust Icons */}
          <div className="grid grid-cols-3 gap-4 p-5 bg-muted/30 rounded-2xl">
            {[
              { icon: Truck, text: "Giao hàng nhanh" },
              { icon: Shield, text: "Hàng chính hãng" },
              { icon: RotateCcw, text: "Đổi trả 30 ngày" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-full text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mt-16">
        <TabsList className="bg-muted/50 rounded-xl p-1">
          <TabsTrigger value="description" className="rounded-lg">Mô tả</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-lg">Đánh giá (128)</TabsTrigger>
          <TabsTrigger value="shipping" className="rounded-lg">Vận chuyển</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card className="p-8 border-0 shadow-sm">
            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <p>{product.description}</p>
              <h4 className="text-foreground font-semibold mt-6 mb-3">Thành phần nổi bật</h4>
              <ul className="space-y-2">
                <li>Chiết xuất thiên nhiên 100%</li>
                <li>Không chứa paraben, sulfate</li>
                <li>Dưỡng ẩm sâu, phù hợp mọi loại da</li>
                <li>Đã qua kiểm nghiệm da liễu</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card className="p-8 border-0 shadow-sm">
            <div className="space-y-6">
              {[
                { name: "Ngọc Trinh", rating: 5, text: "Sản phẩm tuyệt vời, da mình cải thiện rõ rệt sau 2 tuần!", date: "15/03/2026" },
                { name: "Thu Hà", rating: 5, text: "Mình rất hài lòng, đóng gói đẹp và giao hàng nhanh.", date: "10/03/2026" },
                { name: "Mai Anh", rating: 4, text: "Chất lượng tốt, sẽ mua lại. Giá hơi cao nhưng xứng đáng.", date: "05/03/2026" },
              ].map((review, i) => (
                <div key={i} className="border-b border-border/50 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-rose-100 rounded-full flex items-center justify-center font-semibold text-primary text-sm">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{review.name}</p>
                        <div className="flex">{[...Array(review.rating)].map((_, j) => <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />)}</div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-[52px]">{review.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <Card className="p-8 border-0 shadow-sm">
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Giao hàng miễn phí</p>
                  <p>Áp dụng cho đơn hàng từ 500.000₫. Thời gian giao hàng 2-5 ngày làm việc.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Đổi trả dễ dàng</p>
                  <p>Đổi trả miễn phí trong vòng 30 ngày nếu sản phẩm lỗi hoặc không đúng mô tả.</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
