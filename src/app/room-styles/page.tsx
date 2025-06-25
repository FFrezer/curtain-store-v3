// src/app/room-styles/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const roomStyles = [
  {
    title: "Main Room",
    image: "/images/blackout-curtain.jpg",
    description:
      "Create a cozy and elegant atmosphere for your main room with our blackout curtains.",
    href: "/shop?filter=Blackout"
  },
  {
    title: "Kids Room",
    image: "/images/kids-curtain.jpg",
    description:
      "Bright, playful, and practical — our kids room curtains come in fun designs that inspire imagination.",
    href: "/shop?filter=Kids"
  },
  {
    title: "Modern Living Room",
    image: "/images/sheer-curtain.jpg",
    description:
      "Sophisticated sheer curtains let in light and add class to your living room.",
    href: "/shop?filter=Sheer"
  },
  {
    title: "Minimalist Bedroom",
    image: "/images/white-curtain.jpg",
    description:
      "Soft, neutral curtains for minimalist spaces with comfort and privacy.",
    href: "/shop?filter=Basic"
  },
  {
    title: "Scandinavian Lounge",
    image: "/images/patterned-curtain.jpg",
    description:
      "Clean lines and soft textures—perfect for a Scandi-styled lounge.",
    href: "/shop?filter=Patterned"
  },
  {
    title: "Boho Chic Bedroom",
    image: "/images/velvet-curtain.jpg",
    description:
      "Add personality with rich fabrics and layered curtains.",
    href: "/shop?filter=Luxury"
  }
];

export default function RoomStylesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 px-4 py-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Room & Curtain Styles</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roomStyles.map((room, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4">
              <Link href={room.href}>
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-48 object-cover rounded-md hover:opacity-80"
                />
                <h2 className="text-xl font-semibold mt-4">{room.title}</h2>
              </Link>
              <p className="text-gray-600 mt-2">{room.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
