"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, type BlogPost } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts("published=true")
      .then((res) => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Blog <span className="font-heading italic text-primary">Làm Đẹp</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Chia sẻ bí quyết chăm sóc da, xu hướng trang điểm và tips làm đẹp hàng ngày
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">Chưa có bài viết nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className={`overflow-hidden group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}>
                <div className={`relative overflow-hidden bg-gray-50 ${i === 0 ? "aspect-[2/1]" : "aspect-[3/2]"}`}>
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} className="bg-white/90 text-foreground rounded-full text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    {post.author && (
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> {post.author.name}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <h2 className={`font-bold mb-2 group-hover:text-primary transition-colors ${i === 0 ? "text-xl" : "text-base"}`}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  )}
                  <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Đọc thêm <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
