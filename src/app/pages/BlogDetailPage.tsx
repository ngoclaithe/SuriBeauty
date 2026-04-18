import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const post = {
  title: "The Complete Morning Skincare Routine for Glowing Skin",
  category: "Skincare",
  date: "March 15, 2026",
  readTime: "5 min read",
  author: "Dr. Emily Chen",
  image: "https://images.unsplash.com/photo-1662577066108-4bb081e818b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHJvdXRpbmUlMjB3b21hbnxlbnwxfHx8fDE3NzM4Mzk5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

const relatedPosts = [
  {
    id: 2,
    slug: "natural-beauty-ingredients",
    title: "10 Natural Ingredients for Beautiful Skin",
    image: "https://images.unsplash.com/photo-1761864293811-d6e937225df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwYmVhdXR5JTIwaW5ncmVkaWVudHN8ZW58MXx8fHwxNzczOTEyODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Natural Beauty",
  },
  {
    id: 4,
    slug: "vitamin-c-benefits",
    title: "Why Vitamin C Should Be in Your Skincare Routine",
    image: "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MzgxNDYzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Skincare",
  },
];

export function BlogDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] bg-gray-100">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
              <div>By {post.author}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-3 prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
              A consistent morning skincare routine is the foundation of healthy, glowing skin. Follow these essential steps to start your day with confidence and radiance.
            </p>

            <h2>1. Cleanse Gently</h2>
            <p>
              Start your morning with a gentle cleanser to remove any oil, sweat, or impurities that accumulated overnight. Choose a pH-balanced cleanser that won't strip your skin's natural moisture barrier.
            </p>
            <p>
              For dry skin, opt for a creamy cleanser. For oily or combination skin, a gel-based cleanser works best. Massage the cleanser onto damp skin for 30-60 seconds, then rinse with lukewarm water.
            </p>

            <h2>2. Apply Toner</h2>
            <p>
              Toner helps balance your skin's pH, removes any remaining impurities, and prepares your skin to better absorb the products that follow. Look for alcohol-free toners with hydrating ingredients like hyaluronic acid or soothing extracts like green tea.
            </p>

            <h2>3. Use a Vitamin C Serum</h2>
            <p>
              Vitamin C is a powerhouse ingredient for morning skincare. It brightens skin, protects against environmental damage, and boosts collagen production. Apply 2-3 drops to clean skin and gently pat it in.
            </p>
            <p>
              Our Radiance Vitamin C Serum is specifically formulated with 20% pure L-ascorbic acid for maximum effectiveness while remaining gentle on all skin types.
            </p>

            <h2>4. Moisturize</h2>
            <p>
              Even if you have oily skin, moisturizer is essential. It locks in all the beneficial ingredients from previous steps and keeps your skin hydrated throughout the day. Choose a lightweight formula for daytime that won't feel heavy under makeup.
            </p>

            <h2>5. Always Use SPF</h2>
            <p>
              This is the most important step! Apply a broad-spectrum sunscreen with at least SPF 30 every single day, even when it's cloudy. UV damage is the leading cause of premature aging, dark spots, and skin cancer.
            </p>

            <h2>Consistency is Key</h2>
            <p>
              The secret to great skin isn't just about the products you use—it's about using them consistently. Give your routine at least 4-6 weeks before expecting to see significant results. Your skin will thank you!
            </p>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg my-8">
              <p className="font-semibold mb-2">Pro Tip:</p>
              <p className="text-muted-foreground">
                Always apply skincare products from thinnest to thickest consistency. This ensures each product can penetrate properly and deliver maximum benefits.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Share */}
            <Card className="p-6 mb-6 sticky top-24">
              <h3 className="font-semibold mb-4">Share this article</h3>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </Card>

            {/* Author */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">About the Author</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{post.author}</span> is a board-certified dermatologist with over 15 years of experience in skincare and cosmetic dermatology.
              </p>
            </Card>
          </aside>
        </div>

        {/* Related Posts */}
        <div className="mt-16 pt-16 border-t border-border">
          <h2 className="text-2xl font-semibold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">{relatedPost.category}</Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
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
