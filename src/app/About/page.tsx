'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="px-6 py-5 space-y-16 max-w-5xl mx-auto">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About ADE Curtain Store</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          With over <strong>40 years of experience</strong>, ADE Curtain Store stands as a cornerstone of excellence in Ethiopia's home décor and textile industry.
        </p>
      </section>

      <section className="grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-4 text-gray-700">
          <p>
            Since our humble beginnings, we’ve grown into a trusted name known for <strong>uncompromising quality</strong>, <strong>timeless style</strong>, and <strong>exceptional customer care</strong>.
          </p>
          <p>
            ADE sources premium textiles from the world’s leading fabric nations — <strong>Turkey, China</strong>, and beyond — to bring you a curated selection of elegant, durable, and fashionable curtains and home fabrics.
          </p>
          <p>
            Whether you're furnishing a cozy home, styling a modern office, or dressing a luxury hotel, our team of experts provides <strong>consultation</strong>, <strong>custom tailoring</strong>, and <strong>professional installation</strong> to meet your vision.
          </p>
          <p>
            Generations of satisfied customers trust ADE for our craftsmanship, attention to detail, and enduring commitment to style.
          </p>
          <p className="text-xl italic text-black font-semibold">
            At ADE, we don’t just hang curtains — we frame the stories of your spaces.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/bedroom.jpg" // Replace with a real image
            alt="ADE Curtain showroom"
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Legacy in Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-800">
          <div>
            <p className="text-3xl font-bold">40+</p>
            <p>Years of Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold">3</p>
            <p>Branches Across Addis</p>
          </div>
          <div>
            <p className="text-3xl font-bold">10,000+</p>
            <p>Satisfied Clients</p>
          </div>
        </div>
      </section>
    </div>
  );
}
