"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // 50px以上スクロールしたら白背景にする
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期化時にもチェック

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 透明時のテキスト色。画像の上に乗るため白（見えにくい場合はドロップシャドウ）
  const transparentTextColor = "text-white drop-shadow-md";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 no-print print:hidden ${
        isScrolled
          ? "bg-white text-gray-900 shadow-sm py-4"
          : `bg-transparent ${transparentTextColor} py-6`
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-lg">
          <img src="/icon.png" alt="KENOHI Logo" className={`w-8 h-8 object-contain transition-all duration-300 ${isScrolled ? "rounded-full bg-white p-0.5" : ""}`} />
          <span style={{ fontFamily: "Georgia, serif" }}>KENOHI</span>
        </Link>

        {/* PC用ナビゲーション */}
        <nav className="hidden md:flex gap-8 text-sm tracking-widest font-sans">
          <Link href="/#news" className="hover:opacity-70 transition-opacity">NEWS</Link>
          <Link href="/#about" className="hover:opacity-70 transition-opacity">ABOUT US</Link>
          <Link href="/kenocha" className="hover:opacity-70 transition-opacity">PRODUCTS</Link>
          <Link href="/#contact" className="hover:opacity-70 transition-opacity">CONTACT</Link>
        </nav>
        
        {/* モバイル用のハンバーガーアイコン */}
        <button className="md:hidden block hover:opacity-70 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
