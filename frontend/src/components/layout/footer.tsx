import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, ChevronRight, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#1a1a2e] text-white mt-20 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-wider text-white font-heading">SURI</span>
              <span className="text-[9px] text-rose-300/70 tracking-[0.2em] uppercase font-medium">수리</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Mỹ phẩm cao cấp với thành phần thiên nhiên, mang đến vẻ đẹp tự nhiên và rạng rỡ cho bạn.
            </p>
            <div className="flex items-center space-x-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">Cửa hàng</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                { label: "Tất cả sản phẩm", href: "/san-pham" },
                { label: "Chăm sóc da", href: "/san-pham?category=cham-soc-da" },
                { label: "Trang điểm", href: "/san-pham?category=trang-diem" },
                { label: "Nước hoa", href: "/san-pham?category=nuoc-hoa" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors flex items-center group">
                    <ChevronRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">Hỗ trợ</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {["Liên hệ", "Vận chuyển", "Đổi trả", "Câu hỏi thường gặp"].map((label) => (
                <li key={label}>
                  <a href="#" className="hover:text-white transition-colors flex items-center group">
                    <ChevronRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">Liên hệ</h4>
            <div className="space-y-3 text-sm text-white/60 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-rose-300/70 shrink-0" />
                <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-rose-300/70 shrink-0" />
                <span>0901 234 567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-rose-300/70 shrink-0" />
                <span>info@suri.vn</span>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-3">Đăng ký nhận tin khuyến mãi</p>
            <div className="flex gap-2">
              <Input
                placeholder="Email của bạn"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-rose-400/50"
              />
              <Button className="bg-gradient-to-r from-primary to-rose-500 rounded-xl shadow-md hover:shadow-lg transition-shadow shrink-0">
                Gửi
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/40">
          <p>© 2026 SURI Beauty. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
