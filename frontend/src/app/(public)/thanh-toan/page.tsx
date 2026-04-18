"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { createCustomer, createOrder } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Loader2, CheckCircle2, MapPin, User, Phone, FileText } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", note: "" });
  const total = totalPrice();
  const shipping = total >= 500000 ? 0 : 30000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    setLoading(true);

    try {
      const customer = await createCustomer({ name: form.name, phone: form.phone, email: form.email || undefined, address: form.address });
      await createOrder({
        customerId: customer.id,
        items: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingName: form.name,
        shippingPhone: form.phone,
        shippingAddress: form.address,
        shippingNote: form.note || undefined,
      });
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Đặt hàng thành công!</h2>
        <p className="text-muted-foreground mb-8">
          Cảm ơn bạn đã mua hàng tại SURI. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="outline" className="rounded-xl w-full">Về trang chủ</Button>
          </Link>
          <Link href="/san-pham">
            <Button className="bg-gradient-to-r from-primary to-rose-500 rounded-xl w-full">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Giỏ hàng trống</h2>
        <Link href="/san-pham"><Button className="rounded-xl mt-4">Đi mua sắm</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Thanh toán <span className="font-heading italic text-primary">đơn hàng</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-0 shadow-sm space-y-5">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Thông tin giao hàng
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Họ và tên *</Label>
                  <Input id="name" placeholder="Nguyễn Văn A" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Số điện thoại *</Label>
                  <Input id="phone" placeholder="0901 234 567" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Địa chỉ giao hàng *</Label>
                <Input id="address" placeholder="123 Nguyễn Huệ, Quận 1, TP.HCM" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="note" className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> Ghi chú</Label>
                <Input id="note" placeholder="Ghi chú cho đơn hàng..." value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="rounded-xl" />
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 border-0 shadow-sm sticky top-24 space-y-5">
              <h3 className="text-lg font-bold">Đơn hàng của bạn</h3>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                      {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      {item.variantName && <p className="text-xs text-muted-foreground">{item.variantName}</p>}
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                        <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t border-border/50 pt-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span>{formatPrice(total)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Vận chuyển</span><span>{shipping === 0 ? <span className="text-green-600">Miễn phí</span> : formatPrice(shipping)}</span></div>
              </div>

              <div className="flex justify-between font-bold text-lg border-t border-border/50 pt-4">
                <span>Tổng cộng</span>
                <span className="text-primary">{formatPrice(total + shipping)}</span>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-rose-500 rounded-xl text-base shadow-lg hover:shadow-xl transition-shadow"
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                {loading ? "Đang xử lý..." : "Đặt hàng"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Bằng cách đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi.
              </p>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
