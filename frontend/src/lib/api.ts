const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3031/api";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  categoryId: string | null;
  status: string;
  featured: boolean;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  category: Category | null;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  stock: number;
  sku: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  parentId: string | null;
  children?: Category[];
  _count?: { products: number };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  tags: string[];
  createdAt: string;
  author: { id: string; name: string } | null;
}

export interface Order {
  id: string;
  customerId: string;
  totalAmount: number;
  status: string;
  shippingName: string | null;
  shippingPhone: string | null;
  shippingAddress: string | null;
  createdAt: string;
  customer: { name: string; phone: string | null; email: string | null };
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
  variant: ProductVariant | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }
  return res.json();
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

function authFetch<T>(endpoint: string, token: string, options?: RequestInit): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    headers: { ...authHeaders(token), ...options?.headers },
  });
}

// ─── Public APIs ───

// Products
export const getProducts = (params?: string) =>
  fetchApi<PaginatedResponse<Product>>(`/products${params ? `?${params}` : ""}`);

export const getProductBySlug = (slug: string) =>
  fetchApi<Product>(`/products/${slug}`);

export const getFeaturedProducts = () =>
  fetchApi<Product[]>(`/products/featured`);

// Categories
export const getCategories = () =>
  fetchApi<Category[]>(`/categories`);

export const getCategoryBySlug = (slug: string) =>
  fetchApi<Category>(`/categories/${slug}`);

// Blog
export const getBlogPosts = (params?: string) =>
  fetchApi<PaginatedResponse<BlogPost>>(`/blog${params ? `?${params}` : ""}`);

export const getBlogPostBySlug = (slug: string) =>
  fetchApi<BlogPost>(`/blog/${slug}`);

// Orders (public - create)
export const createOrder = (data: any) =>
  fetchApi<Order>("/orders", { method: "POST", body: JSON.stringify(data) });

// Vouchers
export const validateVoucher = (code: string, orderTotal: number) =>
  fetchApi<{ valid: boolean; discount?: number; message?: string }>("/vouchers/validate", {
    method: "POST",
    body: JSON.stringify({ code, orderTotal }),
  });

// Auth
export const login = (email: string, password: string) =>
  fetchApi<{ access_token: string; user: any }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

// Customers (public - create)
export const createCustomer = (data: any) =>
  fetchApi<any>("/customers", { method: "POST", body: JSON.stringify(data) });

// ─── Admin APIs (authenticated) ───

// Products CRUD
export const adminCreateProduct = (token: string, data: any) =>
  authFetch<Product>("/products", token, { method: "POST", body: JSON.stringify(data) });

export const adminUpdateProduct = (token: string, id: string, data: any) =>
  authFetch<Product>(`/products/${id}`, token, { method: "PUT", body: JSON.stringify(data) });

export const adminDeleteProduct = (token: string, id: string) =>
  authFetch<void>(`/products/${id}`, token, { method: "DELETE" });

// Categories CRUD
export const adminCreateCategory = (token: string, data: any) =>
  authFetch<Category>("/categories", token, { method: "POST", body: JSON.stringify(data) });

export const adminUpdateCategory = (token: string, id: string, data: any) =>
  authFetch<Category>(`/categories/${id}`, token, { method: "PUT", body: JSON.stringify(data) });

export const adminDeleteCategory = (token: string, id: string) =>
  authFetch<void>(`/categories/${id}`, token, { method: "DELETE" });

// Orders (admin)
export const adminGetOrders = (token: string, params?: string) =>
  authFetch<PaginatedResponse<Order>>(`/orders${params ? `?${params}` : ""}`, token);

export const adminUpdateOrderStatus = (token: string, id: string, status: string) =>
  authFetch<Order>(`/orders/${id}/status`, token, { method: "PATCH", body: JSON.stringify({ status }) });

// Customers (admin)
export const adminGetCustomers = (token: string, params?: string) =>
  authFetch<PaginatedResponse<any>>(`/customers${params ? `?${params}` : ""}`, token);

export const adminGetCustomerById = (token: string, id: string) =>
  authFetch<any>(`/customers/${id}`, token);

// Upload
export async function uploadFiles(token: string, files: File[]): Promise<{ url: string; filename: string; size: number; type: string }[]> {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message || "Upload failed"); }
  return res.json();
}

// Vouchers admin CRUD
export const adminGetVouchers = (token: string) =>
  authFetch<any[]>("/vouchers", token);

export const adminCreateVoucher = (token: string, data: any) =>
  authFetch<any>("/vouchers", token, { method: "POST", body: JSON.stringify(data) });

export const adminUpdateVoucher = (token: string, id: string, data: any) =>
  authFetch<any>(`/vouchers/${id}`, token, { method: "PUT", body: JSON.stringify(data) });

export const adminDeleteVoucher = (token: string, id: string) =>
  authFetch<void>(`/vouchers/${id}`, token, { method: "DELETE" });

// Blog admin CRUD
export const adminCreateBlogPost = (token: string, data: any) =>
  authFetch<BlogPost>("/blog", token, { method: "POST", body: JSON.stringify(data) });

export const adminUpdateBlogPost = (token: string, id: string, data: any) =>
  authFetch<BlogPost>(`/blog/${id}`, token, { method: "PUT", body: JSON.stringify(data) });

export const adminDeleteBlogPost = (token: string, id: string) =>
  authFetch<void>(`/blog/${id}`, token, { method: "DELETE" });
