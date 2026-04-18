import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const posts = [
  {
    id: 1,
    slug: "complete-skincare-routine",
    title: "The Complete Morning Skincare Routine for Glowing Skin",
    excerpt: "Discover the essential steps for a perfect morning skincare routine that will leave your skin radiant and healthy all day long.",
    image: "https://images.unsplash.com/photo-1662577066108-4bb081e818b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHJvdXRpbmUlMjB3b21hbnxlbnwxfHx8fDE3NzM4Mzk5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Skincare",
    date: "March 15, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    slug: "natural-beauty-ingredients",
    title: "10 Natural Ingredients for Beautiful Skin",
    excerpt: "Learn about the most effective natural ingredients that can transform your skincare routine and give you radiant, healthy skin.",
    image: "https://images.unsplash.com/photo-1761864293811-d6e937225df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwYmVhdXR5JTIwaW5ncmVkaWVudHN8ZW58MXx8fHwxNzczOTEyODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Natural Beauty",
    date: "March 12, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    slug: "makeup-tutorial-beginners",
    title: "Makeup Tutorial for Beginners: Master the Basics",
    excerpt: "A comprehensive guide to makeup basics, from foundation to finishing touches. Perfect for anyone starting their makeup journey.",
    image: "https://images.unsplash.com/photo-1585049303349-6680e6179692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjB0dXRvcmlhbHxlbnwxfHx8fDE3NzM5MTM0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Makeup",
    date: "March 10, 2026",
    readTime: "8 min read",
  },
  {
    id: 4,
    slug: "vitamin-c-benefits",
    title: "Why Vitamin C Should Be in Your Skincare Routine",
    excerpt: "Explore the amazing benefits of vitamin C for your skin and how to incorporate it into your daily routine for best results.",
    image: "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MzgxNDYzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Skincare",
    date: "March 8, 2026",
    readTime: "6 min read",
  },
  {
    id: 5,
    slug: "night-cream-guide",
    title: "The Ultimate Guide to Choosing the Perfect Night Cream",
    excerpt: "Find out how to select the best night cream for your skin type and maximize its benefits for overnight skin repair.",
    image: "https://images.unsplash.com/photo-1767611033962-6e3124c71450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBqYXJ8ZW58MXx8fHwxNzczODk4OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Skincare",
    date: "March 5, 2026",
    readTime: "5 min read",
  },
  {
    id: 6,
    slug: "spring-makeup-trends",
    title: "Spring 2026 Makeup Trends You Need to Try",
    excerpt: "Stay ahead of the curve with these fresh and exciting makeup trends that are taking the beauty world by storm this spring.",
    image: "https://images.unsplash.com/photo-1629380106682-6736d2c327ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc3Mzg5MzA4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Makeup",
    date: "March 1, 2026",
    readTime: "6 min read",
  },
];

const categories = ["All", "Skincare", "Makeup", "Natural Beauty", "Tips & Tricks"];

export function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-semibold mb-4">Beauty Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert tips, tutorials, and the latest trends in beauty and skincare
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        <Link to={`/blog/${posts[0].slug}`}>
          <Card className="overflow-hidden mb-12 group cursor-pointer">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4">{posts[0].category}</Badge>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {posts[0].date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {posts[0].readTime}
                  </div>
                </div>
                <h2 className="text-3xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {posts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center text-primary font-medium">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card className="overflow-hidden group cursor-pointer h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4">{post.category}</Badge>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Read More
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
