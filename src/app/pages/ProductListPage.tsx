import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Heart, Star, SlidersHorizontal } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const products = [
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
  {
    id: 5,
    name: "Radiant Glow Eye Palette",
    category: "Makeup",
    price: 54.00,
    image: "https://images.unsplash.com/photo-1583012279653-1575246476c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBzaGFkb3clMjBwYWxldHRlJTIwbWFrZXVwfGVufDF8fHx8MTc3Mzc5MDA2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Hydrating Day Moisturizer",
    category: "Skincare",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1609097164673-7cfafb51b926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2lzdHVyaXplciUyMGNyZWFtJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzczOTEzMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Purifying Clay Mask",
    category: "Skincare",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwbWFzayUyMGJlYXV0eXxlbnwxfHx8fDE3NzM5MTMxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Flawless Foundation",
    category: "Makeup",
    price: 48.00,
    image: "https://images.unsplash.com/photo-1512207576147-99bc3066b621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3VuZGF0aW9uJTIwbWFrZXVwJTIwYm90dGxlfGVufDF8fHx8MTc3Mzg0ODk4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
  },
];

const categories = ["All", "Skincare", "Makeup", "Fragrance"];

export function ProductListPage() {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-semibold mb-2">All Products</h1>
          <p className="text-muted-foreground">Discover our complete collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  Clear All
                </Button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <Label className="mb-3 block">Category</Label>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <label
                        htmlFor={category}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="mb-3 block">Price Range</Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  step={10}
                  className="mb-3"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <Label className="mb-3 block">Rating</Label>
                <div className="space-y-3">
                  {[5, 4, 3].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm cursor-pointer flex-1 flex items-center"
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {rating}+ Stars
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </Card>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{products.length}</span> products
              </p>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <Select defaultValue="featured">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <Card className="overflow-hidden group cursor-pointer h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Heart className="h-5 w-5" />
                      </div>
                      <Button
                        size="sm"
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Quick View
                      </Button>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-semibold mb-2 flex-1">{product.name}</h3>
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

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="outline" className="bg-primary text-primary-foreground">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
