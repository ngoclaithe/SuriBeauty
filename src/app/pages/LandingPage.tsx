import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Star, Check, ArrowRight, Sparkles, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const products = [
  {
    id: 1,
    name: "Radiance Vitamin C Serum",
    image: "https://images.unsplash.com/photo-1763986668655-413d55a24f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc3MzgxNDYzOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Luxury Night Cream",
    image: "https://images.unsplash.com/photo-1767611033962-6e3124c71450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBqYXJ8ZW58MXx8fHwxNzczODk4OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Hydrating Day Moisturizer",
    image: "https://images.unsplash.com/photo-1609097164673-7cfafb51b926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2lzdHVyaXplciUyMGNyZWFtJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzczOTEzMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-white py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-semibold">Spring Sale 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
              Transform Your Skin
              <br />
              <span className="text-primary">Save Up to 40% Off</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Premium skincare bundle with proven results. Natural ingredients, visible transformation in just 30 days.
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-semibold">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Hours</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-semibold">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Minutes</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-semibold">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Seconds</p>
              </div>
            </div>

            <Button size="lg" className="text-lg px-8 py-6">
              Shop Now - Limited Time
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              ⭐ Rated 4.9/5 by 10,000+ customers
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">Struggling with Dull, Tired Skin?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              You're not alone. Environmental stress, pollution, and aging can leave your skin looking tired and uneven. Traditional products often contain harsh chemicals that do more harm than good.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <Card className="p-6">
                <div className="text-4xl mb-3">😔</div>
                <h3 className="font-semibold mb-2">Dark Spots</h3>
                <p className="text-sm text-muted-foreground">Uneven skin tone and hyperpigmentation</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl mb-3">😓</div>
                <h3 className="font-semibold mb-2">Dryness</h3>
                <p className="text-sm text-muted-foreground">Dehydrated, flaky skin texture</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl mb-3">😞</div>
                <h3 className="font-semibold mb-2">Fine Lines</h3>
                <p className="text-sm text-muted-foreground">Premature aging and wrinkles</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                The Complete Skincare Solution
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our 3-step system combines the power of natural ingredients with advanced science to deliver visible results in 30 days.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "100% natural, cruelty-free ingredients",
                  "Clinically proven results",
                  "Suitable for all skin types",
                  "Free from parabens and sulfates",
                  "Dermatologist recommended"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <Button size="lg">
                Get Your Bundle Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="rounded-xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Powered by Nature's Best</h2>
            <p className="text-primary-foreground/80 mb-12 text-lg">
              Every ingredient is carefully selected for maximum effectiveness and gentleness
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Vitamin C", benefit: "Brightens & evens skin tone" },
                { name: "Hyaluronic Acid", benefit: "Deep hydration & plumping" },
                { name: "Retinol", benefit: "Reduces fine lines & wrinkles" }
              ].map((ingredient, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{ingredient.name}</h3>
                  <p className="text-sm text-primary-foreground/80">{ingredient.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Real Results from Real People</h2>
            <p className="text-muted-foreground text-lg">Join thousands of satisfied customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Emma W.", text: "My skin has never looked better! The dark spots are fading and my complexion is so much brighter.", rating: 5 },
              { name: "Sarah J.", text: "I was skeptical at first, but this bundle completely transformed my skin in just 3 weeks.", rating: 5 },
              { name: "Jessica L.", text: "Best investment I've made in my skincare routine. Natural ingredients that actually work!", rating: 5 }
            ].map((review, index) => (
              <Card key={index} className="p-6">
                <div className="flex space-x-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{review.text}</p>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-muted-foreground">Verified Buyer</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Get 10% Off Your First Order</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join our beauty community and receive exclusive offers and skincare tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12"
            />
            <Button size="lg">
              Get Discount
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime. Your email is safe with us.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-foreground/10 rounded-full mb-6">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-semibold">Sale Ends Soon!</span>
          </div>
          <h2 className="text-4xl font-semibold mb-6">
            Don't Miss Out on Your Transformation
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Limited stock available. Order now and start seeing results in 30 days or your money back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Shop the Bundle - Save 40%
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center items-center gap-8 mt-8 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
