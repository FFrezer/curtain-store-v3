"use client";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-3 mt-10">
      <div className="max-w-6xl mx-auto text-center px-4">
        <p className="text-sm sm:text-base font-medium tracking-wide">
          © <span className="font-bold text-yellow-400">2025 ADEA CurtainStore</span>. All rights reserved.
        </p>
        <p className="mt-1 text-xs sm:text-sm text-gray-400">
          Designed by{" "}
          <a
            href="https://github.com/FFrezer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold hover:underline"
          >
            Frezer| Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}
