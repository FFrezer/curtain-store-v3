// src/types/index.ts
import { Product, Image, Branch } from "@prisma/client";

export interface ProductWithExtras extends Product {
  images: Image[];
  branch: Branch;
}
export interface OrderType {
  name: string;
  email: string;
  phone: string;
  address: string;
  delivery: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  images: string[];
  createdAt: string;
}
