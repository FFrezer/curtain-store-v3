// src/types/index.ts
import { Product, Image, Branch } from "@prisma/client";

export interface ProductWithExtras extends Product {
  images: Image[];
  branch: Branch;
}
