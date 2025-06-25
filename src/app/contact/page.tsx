'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot trap (if filled, it's spam)
    if (form.company !== '') return;

    setLoading(true);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);
    if (res.ok) {
      alert('Message sent successfully!');
      const whatsappMessage = `New inquiry from ${form.name}%0AEmail: ${form.email}%0AMessage: ${form.message}`;
      window.open(`https://wa.me/251939979708?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      setForm({ name: '', email: '', message: '', company: '' });
    } else {
      alert('Failed to send. Try again later.');
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>

      {/* Branch Info */}
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-lg">Merkato - Addis Ababa</h2>
          <p>Shopping Center, Shop A213 and B306/307</p>
          <p>Tel: 0939 979 708 / 0912 605 602</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Piyassa</h2>
          <p>Piyassa Shopping Center, Shop G03</p>
          <p>Tel: 0960 231 547 / 0930 405 766</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Gerji - Alfonso Plaza</h2>
          <p>Tel: 0940 707 077</p>
        </div>
      </div>

      {/* Maps */}
      <div className="grid gap-6 md:grid-cols-3">
        <iframe className="w-full h-64 rounded" src="https://maps.google.com/maps?q=merkato%20addis%20ababa&t=&z=15&ie=UTF8&iwloc=&output=embed" allowFullScreen loading="lazy" />
        <iframe className="w-full h-64 rounded" src="https://maps.google.com/maps?q=piyassa%20shopping%20center%20addis%20ababa&t=&z=15&ie=UTF8&iwloc=&output=embed" allowFullScreen loading="lazy" />
        <iframe className="w-full h-64 rounded" src="https://maps.google.com/maps?q=alfonso%20plaza%20gerji%20addis%20ababa&t=&z=15&ie=UTF8&iwloc=&output=embed" allowFullScreen loading="lazy" />
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        {/* Honeypot field */}
        <input type="text" name="company" value={form.company} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-3 rounded h-32"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
