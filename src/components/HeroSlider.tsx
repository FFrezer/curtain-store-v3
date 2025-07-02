// src/components/HeroSlider.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSliderProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export default function HeroSlider({ images, interval = 5000 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(timer);
  }, [current, interval]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={clsx(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            {
              "opacity-100 z-10": index === current,
              "opacity-0 z-0": index !== current,
            }
          )}
        >
          <Image
           src={image.src}
          alt={image.alt}
            fill
           className="object-cover"
            priority={index === 0}
            />

          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow">Curtains Made Elegant</h1>
            <p className="mt-4 text-lg md:text-xl">Explore luxury drapes and blinds</p>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={clsx(
              "w-3 h-3 rounded-full",
              idx === current ? "bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
