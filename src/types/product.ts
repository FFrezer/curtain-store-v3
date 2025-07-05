// src/types/product.ts

import type { Product, ProductImage, Variant } from '@prisma/client';

export type { Product, ProductImage };
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
  variants: Variant[];
   
};
