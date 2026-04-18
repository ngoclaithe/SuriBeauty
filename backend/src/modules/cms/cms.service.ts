import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  // Blog Posts
  async createBlogPost(data: { title: string; slug: string; content?: string; excerpt?: string; coverImage?: string; published?: boolean; authorId?: string; tags?: string[] }) {
    return this.prisma.blogPost.create({ data });
  }

  async findAllBlogPosts(page = 1, limit = 10, published?: boolean) {
    const where = published !== undefined ? { published } : {};
    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({ where, include: { author: { select: { id: true, name: true } } }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
      this.prisma.blogPost.count({ where }),
    ]);
    return { data: posts, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findBlogPostBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug }, include: { author: { select: { id: true, name: true } } } });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');
    return post;
  }

  async updateBlogPost(id: string, data: any) {
    return this.prisma.blogPost.update({ where: { id }, data });
  }

  async deleteBlogPost(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }

  // Landing Pages
  async createLandingPage(data: { title: string; slug: string; blocks?: any; published?: boolean }) {
    return this.prisma.landingPage.create({ data });
  }

  async findAllLandingPages() {
    return this.prisma.landingPage.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findLandingPageBySlug(slug: string) {
    const page = await this.prisma.landingPage.findUnique({ where: { slug } });
    if (!page) throw new NotFoundException('Landing page không tồn tại');
    return page;
  }

  async updateLandingPage(id: string, data: any) {
    return this.prisma.landingPage.update({ where: { id }, data });
  }

  async deleteLandingPage(id: string) {
    return this.prisma.landingPage.delete({ where: { id } });
  }
}
