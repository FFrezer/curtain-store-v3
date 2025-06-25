// src/types/product.ts
import type { Product, ProductImage } from '@prisma/client';

export type TransformedProduct = {
  id: string;
  name: string;
  price: number | null;
  category: string;
  room?: string;
  featured?: boolean;
  images: { url: string }[];
};

export type ProductWithExtras = Product & {
  images: ProductImage[];
};
