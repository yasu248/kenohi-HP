import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      
      {/* 1. ファーストビュー（シネマティック＆ミニマル） */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-100">
        <div 
          className="absolute inset-0 w-full h-full animate-slow-zoom"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1599321955726-e048426594af?q=80&w=2000&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-white animate-fade-in-up mt-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest mb-6" style={{ writingMode: 'vertical-rl' }}>
            心をつなぐ、<br />一杯の和。
          </h1>
          <p className="mt-8 text-sm tracking-[0.3em] uppercase opacity-90 font-sans">
            Kenohi Inc.
          </p>
        </div>
      </section>

      {/* 2. 企業理念 (Vision / About Us) */}
      <section id="about" className="px-6 py-32 max-w-4xl mx-auto text-center scroll-mt-20">
        <h2 className="text-2xl font-bold mb-12 tracking-widest font-sans">VISION</h2>
        <p className="leading-loose text-gray-700 md:text-lg text-left md:text-center">
          私たちは、日本の伝統的な「お茶」の文化を、<br className="hidden md:block" />
          現代のライフスタイルに合わせて再構築します。<br />
          <br />
          日常の中でほっと一息つける、<br className="hidden md:block" />
          そんな「ケ（日常）」を少しだけ特別にする時間を提供することが、<br className="hidden md:block" />
          株式会社けのひの使命です。
        </p>
        <div className="divider my-16"></div>
      </section>

      {/* 3. 事業紹介 (Business / Products) */}
      <section id="products" className="px-6 py-24 bg-[#f9f9f9] w-full scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-16 text-center tracking-widest font-sans">BUSINESS</h2>
          
          <div className="bg-white p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 aspect-[4/3] bg-gray-200 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=1000&auto=format&fit=crop" 
                alt="けのちゃ店舗イメージ" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <span className="text-xs text-gray-500 tracking-widest mb-3 font-sans">日本茶ミルクティー専門店</span>
              <h3 className="text-2xl font-bold mb-4">けのちゃ (KENOCHA)</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                淹れたてのお茶と優しいミルクの出会い。厳選された茶葉を使用したストレートティーや、オリジナルの日本茶ミルクティーを提供するテイクアウト専門ブランドです。
              </p>
              <Link href="/kenocha" className="inline-block border border-gray-900 px-8 py-4 text-sm tracking-widest hover:bg-gray-900 hover:text-white transition-colors font-sans">
                ブランドサイトを見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ニュース (News) - 仮置き */}
      <section id="news" className="px-6 py-24 max-w-4xl mx-auto w-full scroll-mt-20">
        <h2 className="text-2xl font-bold mb-16 text-center tracking-widest font-sans">NEWS</h2>
        <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
          <li className="py-6 flex flex-col md:flex-row md:items-center gap-4 group cursor-pointer">
            <div className="text-gray-500 text-sm font-sans w-32 shrink-0">2026.08.21</div>
            <div className="font-bold group-hover:text-gray-500 transition-colors">コーポレートサイト（ベータ版）を公開しました</div>
          </li>
          <li className="py-6 flex flex-col md:flex-row md:items-center gap-4 group cursor-pointer">
            <div className="text-gray-500 text-sm font-sans w-32 shrink-0">2026.08.15</div>
            <div className="font-bold group-hover:text-gray-500 transition-colors">日本茶ミルクティー専門店「けのちゃ」東神田店オープンのお知らせ</div>
          </li>
        </ul>
      </section>

      {/* 4. 会社概要 (Company / Contact) */}
      <section id="contact" className="px-6 py-24 max-w-3xl mx-auto w-full scroll-mt-20">
        <h2 className="text-2xl font-bold mb-16 text-center tracking-widest font-sans">COMPANY</h2>
        <div className="border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
              <dt className="text-gray-500 w-32 shrink-0 font-sans text-sm mt-1">会社名</dt>
              <dd className="font-medium">株式会社けのひ (KENOHI Inc.)</dd>
            </div>
            <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
              <dt className="text-gray-500 w-32 shrink-0 font-sans text-sm mt-1">代表者</dt>
              <dd>運営責任者　神部 駿維</dd>
            </div>
            <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
              <dt className="text-gray-500 w-32 shrink-0 font-sans text-sm mt-1">所在地</dt>
              <dd className="leading-loose">
                〒101-0031<br />
                東京都千代田区東神田1-17-5<br />
                東神田イチオクビル2D
              </dd>
            </div>
            <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
              <dt className="text-gray-500 w-32 shrink-0 font-sans text-sm mt-1">事業内容</dt>
              <dd className="leading-loose">日本茶・日本茶ミルクティーの提供（モバイルオーダーシステム「けのちゃ」の運営）、店舗運営</dd>
            </div>
            <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
              <dt className="text-gray-500 w-32 shrink-0 font-sans text-sm mt-1">連絡先</dt>
              <dd>kenocha@kenohi-inc.jp</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
