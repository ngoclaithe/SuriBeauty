"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, Star, Sparkles, Leaf, Heart, Shield, Truck, Award,
  ShoppingCart, Zap, Quote, Droplets, Palette, Wind, Gem, FlaskConical
} from "lucide-react";
import { getProducts, type Product } from "@/lib/api";
import { formatPrice, calcDiscount } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { ProductImage } from "@/components/ui/product-image";

/* ── Category data ── */
const categories = [
  { name: "Chăm sóc da", image: "/cat-skincare.png", slug: "cham-soc-da", desc: "Serum · Kem dưỡng · Mặt nạ" },
  { name: "Trang điểm", image: "/cat-makeup.png", slug: "trang-diem", desc: "Son · Phấn · Mascara" },
  { name: "Nước hoa", image: "/cat-perfume.png", slug: "nuoc-hoa", desc: "EDP · Body Mist · Tinh dầu" },
  { name: "Chống lão hóa", image: "/cat-antiaging.png", slug: "chong-lao-hoa", desc: "Retinol · Peptide · Collagen" },
];

/* ── K-Beauty Steps with Lucide icons ── */
const kbeautySteps = [
  { step: "01", title: "Tẩy trang", desc: "Loại bỏ lớp makeup và bụi bẩn nhẹ nhàng", icon: Droplets },
  { step: "02", title: "Rửa mặt", desc: "Làm sạch sâu với sữa rửa mặt pH thấp", icon: Wind },
  { step: "03", title: "Toner", desc: "Cân bằng pH và cung cấp độ ẩm ban đầu", icon: FlaskConical },
  { step: "04", title: "Serum", desc: "Tinh chất đặc trị nồng độ hoạt chất cao", icon: Gem },
  { step: "05", title: "Kem dưỡng", desc: "Khóa ẩm và bảo vệ da suốt ngày dài", icon: Sparkles },
];

/* ── Reviews ── */
const reviews = [
  { id: 1, name: "Ngọc Trinh", avatar: "NT", rating: 5, text: "Serum Vitamin C tuyệt vời! Da mình sáng hơn hẳn sau 3 tuần. Kết cấu nhẹ, thấm nhanh, không gây nhờn rít.", product: "Serum Vitamin C Rạng Rỡ", verified: true },
  { id: 2, name: "Thu Hà", avatar: "TH", rating: 5, text: "Kem dưỡng ban đêm thay đổi cuộc sống. Sáng dậy da mềm mịn rạng rỡ. Xứng đáng từng đồng!", product: "Kem Dưỡng Ban Đêm Premium", verified: true },
  { id: 3, name: "Mai Anh", avatar: "MA", rating: 5, text: "Son lì tốt nhất mình từng dùng. Màu đẹp chuẩn Hàn, giữ được cả ngày mà không khô môi.", product: "Son Lì Velvet Matte", verified: true },
  { id: 4, name: "Phương Linh", avatar: "PL", rating: 5, text: "Toner cực dịu nhẹ, da nhạy cảm dùng không kích ứng. Sau 1 tháng da đều màu hơn rõ rệt.", product: "Toner Hoa Cúc La Mã", verified: true },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  useEffect(() => {
    getProducts("limit=8&sortBy=createdAt&sortOrder=desc")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: product.id, name: product.name, image: product.images[0] || "", price: product.price, quantity: 1, slug: product.slug });
  };

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: product.id, name: product.name, image: product.images[0] || "", price: product.price, quantity: 1, slug: product.slug });
    router.push("/thanh-toan");
  };

  return (
    <div>
      {/* ═══════ HERO — Modern split layout, no image overlay ═══════ */}
      <section className="relative overflow-hidden bg-[#fdfbf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[75vh] py-16 lg:py-0">
            {/* Left: Text content */}
            <div className="space-y-8 max-w-lg">
              <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">K-Beauty Collection 2026</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                Làn da
                <br />
                <span className="font-heading italic bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">
                  Glass Skin
                </span>
                <br />
                hoàn hảo
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Quy trình chăm sóc da đa bước theo phong cách Hàn Quốc. Thành phần thiên nhiên 100%,
                mang đến làn da trong suốt và rạng ngời tự nhiên.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/san-pham">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-rose-500 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 rounded-full text-base px-8 transition-all">
                    Mua sắm ngay
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/khuyen-mai">
                  <Button size="lg" variant="outline" className="rounded-full text-base px-8 border-primary/20 hover:bg-primary/5 transition-all">
                    Ưu đãi hot
                  </Button>
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex items-center gap-8 pt-4">
                {[
                  { value: "500+", label: "Sản phẩm" },
                  { value: "10K+", label: "Khách hàng" },
                  { value: "4.9", label: "Đánh giá", icon: true },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold flex items-center gap-1">
                      {stat.value}
                      {stat.icon && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product image — clean, no text overlay */}
            <div className="relative flex items-center justify-center">
              {/* Decorative gradient blob behind */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/60 via-pink-50/40 to-amber-50/30 rounded-[3rem] blur-2xl scale-90" />
              <div className="relative z-10 w-full h-[500px]">
                <div className="absolute top-0 right-[15%] w-[260px] md:w-[300px] h-[360px] md:h-[400px] rotate-6 hover:rotate-2 transition-transform duration-500 animate-float" style={{ animationDelay: '0s' }}>
                  <Image src="/hero_soft_kbeauty_2.png" alt="SURI Model" fill sizes="(max-width: 768px) 260px, 300px" className="object-cover rounded-3xl shadow-xl border-4 border-white/80" priority />
                </div>
                <div className="absolute bottom-[-20px] md:bottom-0 left-[5%] w-[280px] md:w-[340px] h-[380px] md:h-[440px] -rotate-3 hover:rotate-0 transition-transform duration-500 animate-float" style={{ animationDelay: '1.5s', zIndex: 11 }}>
                  <Image src="/hero_soft_kbeauty_1.png" alt="SURI Product" fill sizes="(max-width: 768px) 280px, 340px" className="object-cover rounded-3xl shadow-2xl border-4 border-white/80" priority />
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-8 right-4 bg-white rounded-2xl shadow-xl p-4 animate-float z-20">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold">4.9</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">10,000+ đánh giá</p>
              </div>
              <div className="absolute bottom-12 left-0 bg-white rounded-2xl shadow-xl p-4 animate-float z-20" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">100% Organic</div>
                    <div className="text-[10px] text-muted-foreground">An toàn cho mọi da</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CATEGORIES — Modern image cards ═══════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary/70 tracking-[0.2em] uppercase">Bộ sưu tập</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Danh mục <span className="font-heading italic text-primary">sản phẩm</span>
            </h2>
            <p className="text-muted-foreground text-lg">Mỹ phẩm Hàn Quốc được tuyển chọn kỹ lưỡng</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/san-pham?category=${cat.slug}`}>
                <div className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                    <p className="text-white/60 text-sm mt-1">{cat.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-white/80 group-hover:text-white transition-colors">
                      Xem thêm <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ K-BEAUTY ROUTINE — Clean timeline with Lucide icons ═══════ */}
      <section className="py-24 bg-gradient-to-b from-[#f8f5f2] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary/70 tracking-[0.2em] uppercase">Korean Skincare</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Quy trình <span className="font-heading italic text-primary">K-Beauty</span>
            </h2>
            <p className="text-muted-foreground text-lg">5 bước chăm sóc da cơ bản theo phong cách Hàn Quốc</p>
          </div>

          {/* Timeline layout */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[60px] left-0 right-0 h-[2px] bg-gradient-to-r from-rose-200 via-primary/20 to-rose-200" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {kbeautySteps.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center group">
                    {/* Step circle */}
                    <div className="relative mb-6">
                      <div className="w-[120px] h-[120px] rounded-full bg-white border-2 border-primary/10 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:border-primary/30 transition-all duration-500 group-hover:-translate-y-2">
                        <Icon className="h-10 w-10 text-primary/70 group-hover:text-primary transition-colors" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-rose-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-[180px]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED PRODUCTS ═══════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-sm font-medium text-primary/70 tracking-[0.2em] uppercase">Bán chạy nhất</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-3">
                Sản phẩm <span className="font-heading italic text-primary">nổi bật</span>
              </h2>
              <p className="text-muted-foreground text-lg">Được yêu thích nhất bởi cộng đồng SURI</p>
            </div>
            <Link href="/san-pham" className="hidden md:block">
              <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 px-6">
                Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const discount = calcDiscount(product.price, product.comparePrice);
              return (
                <Link key={product.id} href={`/san-pham/${product.slug}`}>
                  <Card className="overflow-hidden group cursor-pointer border-0 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-2xl">
                    <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-2xl">
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          -{discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] text-primary/60 font-medium mb-1 tracking-wider uppercase">{product.category?.name || "Sản phẩm"}</p>
                      <h3 className="font-semibold text-sm mb-3 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.comparePrice && (
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium rounded-xl border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Thêm giỏ
                        </button>
                        <button
                          onClick={(e) => handleBuyNow(e, product)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium rounded-xl bg-gradient-to-r from-primary to-rose-500 text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
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

          {/* Mobile: show all link */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/san-pham">
              <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 px-6">
                Xem tất cả sản phẩm <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ PROMO BANNER — Horizontal CTA ═══════ */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <Image src="/banner-promo.png" alt="SURI Special Promotion" width={1400} height={400} className="w-full h-[280px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-rose-600/80 to-transparent flex items-center">
              <div className="px-12 max-w-lg">
                <h3 className="text-3xl font-bold text-white mb-3 font-heading">Giảm 20% toàn bộ</h3>
                <p className="text-white/80 mb-6">Nhập mã <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">SURI20</span> khi thanh toán</p>
                <Link href="/san-pham">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full shadow-xl font-semibold">
                    Mua ngay <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TRUST BADGES ═══════ */}
      <section className="py-20 bg-[#f8f5f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Miễn phí giao hàng", desc: "Đơn từ 500.000₫", color: "from-blue-500 to-cyan-500" },
              { icon: Shield, title: "Thanh toán bảo mật", desc: "Mã hóa SSL 256-bit", color: "from-emerald-500 to-teal-500" },
              { icon: Award, title: "Chính hãng 100%", desc: "Cam kết authentic", color: "from-amber-500 to-orange-500" },
              { icon: Heart, title: "Đổi trả 30 ngày", desc: "Miễn phí, dễ dàng", color: "from-rose-500 to-pink-500" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ REVIEWS ═══════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary/70 tracking-[0.2em] uppercase">Đánh giá</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Khách hàng <span className="font-heading italic text-primary">nói gì</span>
            </h2>
            <p className="text-muted-foreground text-lg">Hơn 10,000 khách hàng hài lòng trên toàn quốc</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6 border border-border/50 shadow-none hover:shadow-xl hover:border-primary/10 transition-all duration-500 hover:-translate-y-1 rounded-2xl relative overflow-hidden group">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/5 group-hover:text-primary/10 transition-colors" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{review.name}</span>
                      {review.verified && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full font-medium border border-emerald-100">Đã mua</span>
                      )}
                    </div>
                    <div className="flex mt-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>

                <p className="text-xs text-primary/60 font-medium border-t border-border/50 pt-3">{review.product}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ NEWSLETTER ═══════ */}
      <section className="py-24 bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#1a1a2e] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-xl mx-auto px-4 text-center relative">
          <Sparkles className="h-8 w-8 text-rose-300/50 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Nhận ưu đãi <span className="italic text-rose-300">độc quyền</span>
          </h2>
          <p className="text-white/50 mb-8">
            Đăng ký để nhận bí quyết K-Beauty và giảm ngay 10% cho đơn hàng đầu tiên
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email của bạn..."
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-rose-400/50 transition-colors text-sm"
            />
            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-full font-semibold shadow-lg px-6 shrink-0">
              Đăng ký
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
