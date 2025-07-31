// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
 await prisma.product.createMany({
  data: [
    {
      name: "Velvet Curtain",
      category: "Living Room",
      price: 149.99,
      image: "/images/velvet.jpg",
      description: "Luxurious velvet curtains for a dramatic look.",
      branch: "MERKATO", 
    },
    {
      name: "Linen Drapes",
      category: "Bedroom",
      price: 89.99,
      image: "/images/linen.jpg",
      description: "Lightweight linen drapes for a soft, airy feel.",
      branch: "GERJI", 
    }
  ]
});

}

main()
  .then(() => {
    console.log("✅ Seeded successfully");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Seed failed", e);
    return prisma.$disconnect();
  });
