import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { Lock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const cartItems = [
  {
    id: 1,
    name: "Radiance Vitamin C Serum",
    size: "50ml",
    price: 78.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MzgxNDYzOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    size: "Ruby Red",
    price: 32.00,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1773372238324-e9cffa5f45b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXBzdGljayUyMG1ha2V1cCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczODU0MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Luxury Night Cream",
    size: "100ml",
    price: 95.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1767611033962-6e3124c71450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBqYXJ8ZW58MXx8fHwxNzczODk4OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">1</div>
            <div className="text-sm font-medium">Information</div>
            <div className="flex-1 h-px bg-border mx-4"></div>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm">2</div>
            <div className="text-sm text-muted-foreground">Shipping</div>
            <div className="flex-1 h-px bg-border mx-4"></div>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm">3</div>
            <div className="text-sm text-muted-foreground">Payment</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="mt-2" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
                    Email me with news and offers
                  </label>
                </div>
              </div>
            </Card>

            {/* Shipping Information */}
            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" className="mt-2" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" className="mt-2" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" className="mt-2" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" className="mt-2" />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">Credit Card</Label>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">VISA</div>
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">MC</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1 cursor-pointer">PayPal</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="mt-2" />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.size}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-semibold">${total.toFixed(2)}</span>
              </div>

              {/* Place Order Button */}
              <Button size="lg" className="w-full">
                <Lock className="mr-2 h-5 w-5" />
                Place Order
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Your payment information is secure and encrypted
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
