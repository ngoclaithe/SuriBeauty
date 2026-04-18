"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Ticket } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();
  const [voucherCode, setVoucherCode] = useState("");
  const total = totalPrice();
  const shipping = total >= 500000 ? 0 : 30000;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Giỏ hàng trống</h2>
        <p className="text-muted-foreground mb-8">Hãy khám phá và thêm sản phẩm yêu thích vào giỏ hàng</p>
        <Link href="/san-pham">
          <Button size="lg" className="bg-gradient-to-r from-primary to-rose-500 rounded-xl">
            Tiếp tục mua sắm
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Giỏ hàng <span className="font-heading italic text-primary">của bạn</span>
        <span className="text-lg font-normal text-muted-foreground ml-3">({items.length} sản phẩm)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.productId}-${item.variantId}`} className="p-4 flex gap-4 border-0 shadow-sm">
              <Link href={`/san-pham/${item.slug}`} className="shrink-0">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/san-pham/${item.slug}`} className="font-semibold hover:text-primary transition-colors line-clamp-1">{item.name}</Link>
                    {item.variantName && <p className="text-sm text-muted-foreground mt-0.5">{item.variantName}</p>}
                  </div>
                  <button onClick={() => removeItem(item.productId, item.variantId)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)} className="p-2 hover:bg-muted/50 rounded-l-lg transition-colors">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-3 font-medium text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)} className="p-2 hover:bg-muted/50 rounded-r-lg transition-colors">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Link href="/san-pham">
              <Button variant="ghost" className="rounded-xl">
                <ArrowLeft className="mr-2 h-4 w-4" /> Tiếp tục mua sắm
              </Button>
            </Link>
            <Button variant="outline" onClick={clearCart} className="rounded-xl text-destructive hover:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Xoá tất cả
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 border-0 shadow-sm sticky top-24 space-y-5">
            <h3 className="text-lg font-bold">Tóm tắt đơn hàng</h3>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Mã giảm giá"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="pl-9 rounded-xl"
                />
              </div>
              <Button variant="outline" className="rounded-xl shrink-0">Áp dụng</Button>
            </div>

            <div className="space-y-3 text-sm border-t border-border/50 pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tạm tính</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phí vận chuyển</span>
                <span className="font-medium">{shipping === 0 ? <span className="text-green-600">Miễn phí</span> : formatPrice(shipping)}</span>
              </div>
              {total < 500000 && (
                <p className="text-xs text-primary bg-primary/5 p-2 rounded-lg">
                  Mua thêm {formatPrice(500000 - total)} để được miễn phí vận chuyển
                </p>
              )}
            </div>

            <div className="flex justify-between font-bold text-lg border-t border-border/50 pt-4">
              <span>Tổng cộng</span>
              <span className="text-primary">{formatPrice(total + shipping)}</span>
            </div>

            <Link href="/thanh-toan" className="block">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-rose-500 rounded-xl text-base shadow-lg hover:shadow-xl transition-shadow">
                Tiến hành thanh toán
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
