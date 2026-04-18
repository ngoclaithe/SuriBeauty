import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller()
export class CmsController {
  constructor(private cmsService: CmsService) {}

  // Blog
  @Get('blog')
  findAllPosts(@Query('page') page?: string, @Query('published') published?: string) {
    return this.cmsService.findAllBlogPosts(Number(page) || 1, 10, published === 'true' ? true : published === 'false' ? false : undefined);
  }

  @Get('blog/:slug')
  findPostBySlug(@Param('slug') slug: string) { return this.cmsService.findBlogPostBySlug(slug); }

  @Post('blog')
  @UseGuards(JwtAuthGuard)
  createPost(@Body() body: any) { return this.cmsService.createBlogPost(body); }

  @Put('blog/:id')
  @UseGuards(JwtAuthGuard)
  updatePost(@Param('id') id: string, @Body() body: any) { return this.cmsService.updateBlogPost(id, body); }

  @Delete('blog/:id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('id') id: string) { return this.cmsService.deleteBlogPost(id); }

  // Landing Pages
  @Get('landing-pages')
  findAllLandingPages() { return this.cmsService.findAllLandingPages(); }

  @Get('landing-pages/:slug')
  findLandingPage(@Param('slug') slug: string) { return this.cmsService.findLandingPageBySlug(slug); }

  @Post('landing-pages')
  @UseGuards(JwtAuthGuard)
  createLandingPage(@Body() body: any) { return this.cmsService.createLandingPage(body); }

  @Put('landing-pages/:id')
  @UseGuards(JwtAuthGuard)
  updateLandingPage(@Param('id') id: string, @Body() body: any) { return this.cmsService.updateLandingPage(id, body); }

  @Delete('landing-pages/:id')
  @UseGuards(JwtAuthGuard)
  deleteLandingPage(@Param('id') id: string) { return this.cmsService.deleteLandingPage(id); }
}
