// src/types/ProductWithExtras.ts

import { Branch, Product, Image as ProductImage } from "@prisma/client";

export interface ProductWithExtras extends Product {
  images: ProductImage[];
  branch: Branch;
  room: string;
  category: string;
}
