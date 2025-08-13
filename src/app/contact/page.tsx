"use client";

import React, { useRef, useState } from "react";

type BranchKey = "MERKATO" | "PIASSA" | "GERJI";

const branchData: Record<
  BranchKey,
  { title: string; address: string; tel: string; whatsapp: string; map: string }
> = {
  MERKATO: {
    title: "Merkato",
    address:
      "Addis Ababa Market Center | Merkato | አዲስ አበባ የገበያ መአከል | መርካቶ Shop A213 and B306/307",
    tel: "0939 979 708 / 0912 605 602",
    whatsapp: "251939979708",
    map: "https://maps.google.com/maps?q=merkato%20addis%20ababa&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  PIASSA: {
    title: "Piyassa",
    address:
      "Down Town | Piazza | ዳውን ታውን | ፒያሳ Shopping Center, Shop G03",
    tel: "0960 231 547 / 0930 405 766",
    whatsapp: "251960231547",
    map: "https://maps.google.com/maps?q=piyassa%20shopping%20center%20addis%20ababa&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  GERJI: {
    title: "Gerji",
    address: "",
    tel: "0940 707 077",
    whatsapp: "251940707077",
    map: "https://maps.google.com/maps?q=alfonso%20plaza%20gerji%20addis%20ababa&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
};

export default function ContactPage() {
  const branchRefs: Record<BranchKey, React.RefObject<HTMLDivElement | null>> = {
    MERKATO: useRef<HTMLDivElement | null>(null),
    PIASSA: useRef<HTMLDivElement | null>(null),
    GERJI: useRef<HTMLDivElement | null>(null),
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToBranch = (branch: BranchKey) => {
    branchRefs[branch].current?.scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false); // close sidebar on mobile after selection
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile toggle button */}
      <div className="md:hidden flex justify-end p-2 bg-gray-100">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-3 py-2 bg-gray-200 rounded shadow"
        >
          {sidebarOpen ? "Close Menu" : "Branches"}
        </button>
      </div>

      {/* Sidebar navigation */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 p-4 bg-gray-100`}
      >
        {(Object.keys(branchData) as BranchKey[]).map((branch) => (
          <button
            key={branch}
            onClick={() => scrollToBranch(branch)}
            className="block w-full text-left py-2 px-3 mb-2 rounded bg-white shadow hover:bg-gray-50"
          >
            {branchData[branch].title}
          </button>
        ))}
      </div>

      {/* Contact + Map sections */}
      <div className="flex-1 p-4 space-y-8">
        {(Object.keys(branchData) as BranchKey[]).map((branch) => (
          <div
            key={branch}
            ref={branchRefs[branch]}
            className="bg-white rounded-lg shadow p-4"
          >
            <h2 className="text-lg font-semibold mb-1">
              {branchData[branch].title}
            </h2>
            {branchData[branch].address && (
              <p className="text-sm text-gray-600 mb-1">
                {branchData[branch].address}
              </p>
            )}
            <p className="text-sm text-gray-600 mb-2">
              Tel: {branchData[branch].tel}
            </p>

            {/* WhatsApp Contact Form */}
            <form
              action={`https://wa.me/${branchData[branch].whatsapp}`}
              method="get"
              target="_blank"
              className="mt-2"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message {branchData[branch].title} on WhatsApp:
              </label>
              <textarea
                name="text"
                rows={3}
                placeholder="Type your message..."
                className="w-full p-2 border rounded mb-2"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Send via WhatsApp
              </button>
            </form>

            {/* Google Map */}
            <iframe
              src={branchData[branch].map}
              className="w-full h-64 mt-4 rounded"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
