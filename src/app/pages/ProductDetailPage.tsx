import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Heart, Star, Minus, Plus, ShoppingCart, Truck, Shield, RefreshCw } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const product = {
  id: 1,
  name: "Radiance Vitamin C Serum",
  category: "Skincare",
  price: 78.00,
  rating: 4.8,
  reviews: 342,
  description: "Our premium Vitamin C serum is formulated with 20% pure L-ascorbic acid to brighten skin, reduce dark spots, and boost collagen production. Suitable for all skin types.",
  images: [
    "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MzgxNDYzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1629380106682-6736d2c327ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc3Mzg5MzA4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1739981248829-ac9d4a6fecfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwY29zbWV0aWNzJTIwaW5ncmVkaWVudHN8ZW58MXx8fHwxNzczODkwMTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  ],
  sizes: ["30ml", "50ml", "100ml"],
  ingredients: "Water, L-Ascorbic Acid (20%), Hyaluronic Acid, Vitamin E, Ferulic Acid, Glycerin",
  benefits: [
    "Brightens skin tone",
    "Reduces dark spots and hyperpigmentation",
    "Boosts collagen production",
    "Protects against environmental damage",
    "Lightweight, fast-absorbing formula"
  ],
  howToUse: "Apply 2-3 drops to clean, dry skin every morning. Follow with moisturizer and sunscreen."
};

const relatedProducts = [
  {
    id: 3,
    name: "Luxury Night Cream",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1767611033962-6e3124c71450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBqYXJ8ZW58MXx8fHwxNzczODk4OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5.0,
  },
  {
    id: 6,
    name: "Hydrating Day Moisturizer",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1609097164673-7cfafb51b926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2lzdHVyaXplciUyMGNyZWFtJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzczOTEzMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Purifying Clay Mask",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwbWFzayUyMGJlYXV0eXxlbnwxfHx8fDE3NzM5MTMxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
  },
];

const reviews = [
  {
    id: 1,
    name: "Emma Wilson",
    rating: 5,
    date: "March 15, 2026",
    text: "This serum is absolutely amazing! I've been using it for 3 weeks and my skin is noticeably brighter. The texture is lightweight and absorbs quickly.",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    date: "March 10, 2026",
    text: "Best vitamin C serum I've tried. No irritation and my dark spots are fading. Highly recommend!",
    verified: true,
  },
  {
    id: 3,
    name: "Jessica Lee",
    rating: 4,
    date: "March 5, 2026",
    text: "Great product! Wish the bottle was larger for the price, but the quality is excellent.",
    verified: true,
  },
];

export function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                <Heart className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">{product.category}</Badge>
              <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <div className="text-3xl font-semibold">${product.price.toFixed(2)}</div>
            </div>

            <div className="border-t border-b border-border py-6">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selector */}
            <div>
              <Label className="mb-3 block">Size</Label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <Label className="mb-3 block">Quantity</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 border-x border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-muted-foreground">Only 12 items left!</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Link to="/cart" className="flex-1">
                <Button size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders $50+</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% protected</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                Description
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="how-to-use" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                How to Use
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="py-8">
              <div className="max-w-3xl">
                <h3 className="text-xl font-semibold mb-4">Product Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="ingredients" className="py-8">
              <div className="max-w-3xl">
                <p className="text-muted-foreground leading-relaxed">{product.ingredients}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="how-to-use" className="py-8">
              <div className="max-w-3xl">
                <p className="text-muted-foreground leading-relaxed">{product.howToUse}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-8">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold">{review.name}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">Verified Purchase</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
