"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, type BlogPost } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ChevronRight, ArrowLeft, Loader2 } from "lucide-react";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getBlogPostBySlug(slug)
        .then(setPost)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return <div className="flex items-center justify-center py-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!post) {
    return (
      <div className="text-center py-40">
        <p className="text-xl text-muted-foreground mb-4">Bài viết không tồn tại</p>
        <Link href="/blog"><Button>Quay lại Blog</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
      </nav>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-8 shadow-md">
          <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" priority onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full">{tag}</Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-8 border-b border-border/50">
        {post.author && (
          <span className="flex items-center gap-1.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-rose-100 rounded-full flex items-center justify-center text-xs font-bold text-primary">
              {post.author.name[0]}
            </div>
            {post.author.name}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" /> {formatDate(post.createdAt)}
        </span>
      </div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none leading-relaxed
          prose-headings:text-foreground prose-headings:font-bold
          prose-p:text-muted-foreground
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-img:rounded-2xl prose-img:shadow-md
          prose-blockquote:border-primary prose-blockquote:text-muted-foreground
          prose-li:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />

      {/* Back */}
      <div className="mt-12 pt-8 border-t border-border/50">
        <Link href="/blog">
          <Button variant="outline" className="rounded-xl">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại Blog
          </Button>
        </Link>
      </div>
    </div>
  );
}
