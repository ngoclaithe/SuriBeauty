import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@suri.vn' },
    update: {},
    create: { email: 'admin@suri.vn', password: adminPassword, name: 'Admin', role: 'ADMIN' },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'cham-soc-da' }, update: {}, create: { name: 'Chăm sóc da', slug: 'cham-soc-da', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400' } }),
    prisma.category.upsert({ where: { slug: 'trang-diem' }, update: {}, create: { name: 'Trang điểm', slug: 'trang-diem', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' } }),
    prisma.category.upsert({ where: { slug: 'nuoc-hoa' }, update: {}, create: { name: 'Nước hoa', slug: 'nuoc-hoa', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400' } }),
    prisma.category.upsert({ where: { slug: 'cham-soc-toc' }, update: {}, create: { name: 'Chăm sóc tóc', slug: 'cham-soc-toc', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' } }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // Create products
  const products = [
    {
      name: 'Serum Vitamin C Rạng Rỡ',
      slug: 'serum-vitamin-c-rang-ro',
      description: 'Serum Vitamin C cao cấp với 20% L-Ascorbic Acid nguyên chất, giúp làm sáng da, giảm thâm nám và kích thích sản sinh collagen. Phù hợp mọi loại da.',
      price: 780000,
      comparePrice: 950000,
      categoryId: categories[0].id,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
        'https://images.unsplash.com/photo-1629380106682-6736d2c327ed?w=600',
      ],
      tags: ['serum', 'vitamin-c', 'duong-sang'],
      variants: [
        { name: '30ml', price: 580000, stock: 50 },
        { name: '50ml', price: 780000, stock: 30 },
        { name: '100ml', price: 1200000, stock: 15 },
      ],
    },
    {
      name: 'Son Lì Velvet Matte',
      slug: 'son-li-velvet-matte',
      description: 'Son môi lì cao cấp với công thức dưỡng ẩm, giữ màu suốt 12 giờ mà không gây khô môi. Chất son mịn như nhung, lên màu chuẩn.',
      price: 320000,
      comparePrice: 450000,
      categoryId: categories[1].id,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600',
        'https://images.unsplash.com/photo-1631214500115-598fc2cb8ada?w=600',
      ],
      tags: ['son-moi', 'son-li', 'makeup'],
      variants: [
        { name: 'Đỏ Ruby', price: 320000, stock: 100 },
        { name: 'Hồng Cam', price: 320000, stock: 80 },
        { name: 'Đỏ Nâu', price: 320000, stock: 60 },
      ],
    },
    {
      name: 'Kem Dưỡng Ban Đêm Luxury',
      slug: 'kem-duong-ban-dem-luxury',
      description: 'Kem dưỡng da ban đêm với chiết xuất vàng 24K và retinol, giúp tái tạo da, chống lão hóa hiệu quả. Thức dậy với làn da mềm mịn, rạng rỡ.',
      price: 950000,
      comparePrice: 1200000,
      categoryId: categories[0].id,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600',
      ],
      tags: ['kem-duong', 'chong-lao-hoa', 'ban-dem'],
      variants: [
        { name: '30ml', price: 750000, stock: 25 },
        { name: '50ml', price: 950000, stock: 20 },
      ],
    },
    {
      name: 'Nước Hoa Noir Eau de Parfum',
      slug: 'nuoc-hoa-noir-eau-de-parfum',
      description: 'Nước hoa cao cấp với hương đầu bergamot, hương giữa hoa hồng và hoa nhài, hương cuối gỗ đàn hương và xạ hương. Quyến rũ và sang trọng.',
      price: 1250000,
      comparePrice: 1800000,
      categoryId: categories[2].id,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600',
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600',
      ],
      tags: ['nuoc-hoa', 'luxury', 'unisex'],
      variants: [
        { name: '50ml', price: 1250000, stock: 40 },
        { name: '100ml', price: 1850000, stock: 20 },
      ],
    },
    {
      name: 'Phấn Mắt Radiant Glow',
      slug: 'phan-mat-radiant-glow',
      description: 'Bảng phấn mắt 12 màu với sự kết hợp giữa shimmer và matte. Màu sắc bám dính lâu trôi, dễ blend, phù hợp cả ngày lẫn đêm.',
      price: 540000,
      comparePrice: 680000,
      categoryId: categories[1].id,
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1583241800698-e8ab01d085f5?w=600',
      ],
      tags: ['phan-mat', 'palette', 'makeup'],
      variants: [
        { name: 'Warm Tone', price: 540000, stock: 35 },
        { name: 'Cool Tone', price: 540000, stock: 30 },
      ],
    },
    {
      name: 'Kem Dưỡng Ẩm Ban Ngày SPF50',
      slug: 'kem-duong-am-ban-ngay-spf50',
      description: 'Kem dưỡng ẩm đa năng kết hợp chống nắng SPF50, bảo vệ da khỏi tia UV và ô nhiễm môi trường. Kết cấu nhẹ, thấm nhanh, không bít tắc lỗ chân lông.',
      price: 680000,
      categoryId: categories[0].id,
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600',
      ],
      tags: ['kem-duong', 'chong-nang', 'spf50'],
      variants: [
        { name: '50ml', price: 680000, stock: 45 },
      ],
    },
    {
      name: 'Mặt Nạ Đất Sét Thanh Lọc',
      slug: 'mat-na-dat-set-thanh-loc',
      description: 'Mặt nạ đất sét với kaolin và bentonite, giúp hút sạch bã nhờn, thu nhỏ lỗ chân lông và làm sáng da. Bổ sung chiết xuất trà xanh và tràm trà.',
      price: 420000,
      comparePrice: 520000,
      categoryId: categories[0].id,
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600',
      ],
      tags: ['mat-na', 'dat-set', 'thanh-loc'],
      variants: [
        { name: '100ml', price: 420000, stock: 60 },
      ],
    },
    {
      name: 'Kem Nền Flawless Foundation',
      slug: 'kem-nen-flawless-foundation',
      description: 'Kem nền mỏng nhẹ với độ che phủ từ trung bình đến cao. Công thức chứa hyaluronic acid giúp giữ ẩm suốt 24h, không gây cakey.',
      price: 480000,
      categoryId: categories[1].id,
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1631214500115-598fc2cb8ada?w=600',
      ],
      tags: ['kem-nen', 'foundation', 'makeup'],
      variants: [
        { name: 'Tone Sáng', price: 480000, stock: 40 },
        { name: 'Tone Trung', price: 480000, stock: 35 },
        { name: 'Tone Tối', price: 480000, stock: 25 },
      ],
    },
  ];

  for (const { variants, ...productData } of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    });

    // Create variants
    for (const variant of variants) {
      await prisma.productVariant.create({
        data: { ...variant, productId: product.id },
      }).catch(() => {/* variant may already exist */ });
    }
  }
  console.log('✅ Products created:', products.length);

  // Create blog posts
  await prisma.blogPost.upsert({
    where: { slug: '10-buoc-cham-soc-da-co-ban' },
    update: {},
    create: {
      title: '10 Bước Chăm Sóc Da Cơ Bản Cho Người Mới Bắt Đầu',
      slug: '10-buoc-cham-soc-da-co-ban',
      excerpt: 'Hướng dẫn chi tiết về quy trình chăm sóc da từ A đến Z, phù hợp cho người mới bắt đầu.',
      content: 'Chăm sóc da là một hành trình dài và cần sự kiên trì. Bài viết này sẽ hướng dẫn bạn 10 bước cơ bản để có làn da khỏe mạnh...',
      published: true,
      authorId: admin.id,
      coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
      tags: ['skincare', 'huong-dan', 'nguoi-moi'],
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'xu-huong-trang-diem-2026' },
    update: {},
    create: {
      title: 'Xu Hướng Trang Điểm Hot Nhất 2026',
      slug: 'xu-huong-trang-diem-2026',
      excerpt: 'Khám phá những xu hướng trang điểm được yêu thích nhất năm 2026.',
      content: 'Năm 2026 đánh dấu sự trở lại của phong cách trang điểm tự nhiên, nhẹ nhàng nhưng vẫn nổi bật...',
      published: true,
      authorId: admin.id,
      coverImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
      tags: ['makeup', 'xu-huong', '2026'],
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'cach-chon-nuoc-hoa-phu-hop' },
    update: {},
    create: {
      title: 'Cách Chọn Nước Hoa Phù Hợp Với Phong Cách Của Bạn',
      slug: 'cach-chon-nuoc-hoa-phu-hop',
      excerpt: 'Hướng dẫn cách chọn nước hoa phù hợp theo từng dịp và phong cách cá nhân.',
      content: 'Nước hoa không chỉ là mùi hương, mà còn là cách thể hiện cá tính và phong cách riêng của bạn...',
      published: true,
      authorId: admin.id,
      coverImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      tags: ['nuoc-hoa', 'huong-dan'],
    },
  });
  console.log('✅ Blog posts created');

  // Create vouchers
  await prisma.voucher.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: { code: 'WELCOME10', discountType: 'PERCENTAGE', discountValue: 10, minOrderValue: 500000, maxDiscount: 200000, usageLimit: 100, expiredAt: new Date('2026-12-31') },
  });
  await prisma.voucher.upsert({
    where: { code: 'SURI50K' },
    update: {},
    create: { code: 'SURI50K', discountType: 'FIXED', discountValue: 50000, minOrderValue: 300000, usageLimit: 200, expiredAt: new Date('2026-06-30') },
  });
  console.log('✅ Vouchers created');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
