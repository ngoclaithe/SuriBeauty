import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowRight, Star, Sparkles, Leaf, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const featuredProducts = [
  {
    id: 1,
    name: "Radiance Vitamin C Serum",
    category: "Skincare",
    price: 78.00,
    image: "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MzgxNDYzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    category: "Makeup",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1773372238324-e9cffa5f45b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXBzdGljayUyMG1ha2V1cCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczODU0MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Luxury Night Cream",
    category: "Skincare",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1767611033962-6e3124c71450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBqYXJ8ZW58MXx8fHwxNzczODk4OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5.0,
  },
  {
    id: 4,
    name: "Noir Eau de Parfum",
    category: "Fragrance",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1648208567967-19e0b7b10066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlJTIwYm90dGxlfGVufDF8fHx8MTc3Mzg0MzMwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
  },
];

const categories = [
  { name: "Skincare", icon: Sparkles, count: 124 },
  { name: "Makeup", icon: Heart, count: 98 },
  { name: "Fragrance", icon: Leaf, count: 45 },
  { name: "Natural", icon: Leaf, count: 67 },
];

const reviews = [
  {
    id: 1,
    name: "Emma Wilson",
    rating: 5,
    text: "Absolutely love the Vitamin C serum! My skin has never looked better. The texture is lightweight and absorbs quickly.",
    product: "Radiance Vitamin C Serum",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    text: "The night cream is a game-changer. I wake up with soft, glowing skin every morning. Worth every penny!",
    product: "Luxury Night Cream",
  },
  {
    id: 3,
    name: "Jessica Lee",
    rating: 5,
    text: "Best lipstick I've ever used. The color is perfect and it stays on all day without drying my lips.",
    product: "Velvet Matte Lipstick",
  },
];

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/5 rounded-full">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary">New Collection 2026</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                Discover Your
                <br />
                <span className="text-primary">Natural Beauty</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Premium cosmetics crafted with natural ingredients for radiant, healthy skin. Experience luxury that cares.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/landing/spring-sale">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Sale
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl font-semibold">100%</div>
                  <div className="text-sm text-muted-foreground">Natural</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold">4.9</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759693164491-01acd5831b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFwcGx5aW5nJTIwbWFrZXVwfGVufDF8fHx8MTc3Mzg1NDUyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Natural Beauty"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs hidden lg:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">100% Natural</div>
                    <div className="text-sm text-muted-foreground">Organic ingredients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our curated collections</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} to={`/products?category=${category.name.toLowerCase()}`}>
                  <Card className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} products</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Featured Products</h2>
              <p className="text-muted-foreground">Discover our best-selling items</p>
            </div>
            <Link to="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <Heart className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
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
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">Real reviews from real people</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{review.text}</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.product}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Beauty Community</h2>
          <p className="text-primary-foreground/80 mb-8">
            Get exclusive offers, beauty tips, and early access to new products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
