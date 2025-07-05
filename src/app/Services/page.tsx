// src/app/services/page.tsx
'use client';

import { Wrench, Ruler, Scissors } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="p-3 space-y-5 max-w-6xl mx-auto">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center">Our Services</h1>

      {/* Services Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
          <div className="mb-4 text-primary">
            <Ruler className="h-10 w-10" />
          </div>
          <h2 className="font-semibold text-xl mb-2">Custom Curtain Design</h2>
          <p>Tailored designs made to match your interior style and measurements exactly.</p>
        </div>

        <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
          <div className="mb-4 text-primary">
            <Wrench className="h-10 w-10" />
          </div>
          <h2 className="font-semibold text-xl mb-2">Professional Installation</h2>
          <p>Expert fitting and installation to ensure your curtains look perfect and function smoothly.</p>
        </div>

        <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
          <div className="mb-4 text-primary">
            <Scissors className="h-10 w-10" />
          </div>
          <h2 className="font-semibold text-xl mb-2">Curtain Tailoring</h2>
          <p>We cut, hem, and adjust curtains to your exact needs using high-quality techniques.</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow">
        <h3 className="text-2xl font-semibold mb-6 text-center">What Our Customers Say</h3>
        <div className="space-y-4">
          <blockquote className="italic border-l-4 border-black pl-4">
  &ldquo;Excellent service! The team was helpful and my curtains look stunning.&rdquo;  Bethlehem A.
</blockquote>

          <blockquote className="italic border-l-4 border-black pl-4">
            &ldquo;They came to my home, helped me choose styles, and installed everything perfectly."  Dawit M.
          </blockquote>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <a
          href="/contact"
          className="inline-block bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition text-lg font-medium"
        >
          Get a Free Consultation
        </a>
      </div>
    </div>
  );
}
