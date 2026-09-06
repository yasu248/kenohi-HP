"use client";

import { useState, useEffect } from "react";

export default function Kenocha() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIsOpen = () => {
      const now = new Date();
      // 日本時間 (JST) で判定
      const jstDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
      const day = jstDate.getDay(); // 0: 日, 1: 月, ..., 6: 土
      const hour = jstDate.getHours();
      const minutes = jstDate.getMinutes();

      // 平日 (月〜金) かつ 10:00 〜 15:00
      if (day >= 1 && day <= 5) {
        const timeValue = hour * 100 + minutes;
        if (timeValue >= 1000 && timeValue < 1500) {
          return true;
        }
      }
      return false;
    };

    const updateStatus = () => {
      setIsOpen(checkIsOpen());
    };

    const timeoutId = setTimeout(updateStatus, 0);

    // 1分ごとに更新
    const timer = setInterval(updateStatus, 60000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(timer);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#fcfaf8] text-gray-800 font-serif">
      {/* 共通のHeaderが上部に来るため、トップイメージは画面の一番上から始まるようにネガティブマージンかそのまま配置します */}

      {/* トップイメージ */}
      <section className="w-full h-[60vh] relative overflow-hidden bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-40 mix-blend-multiply"></div>
        {/* コントラストを保つための薄いグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none drop-shadow-md">
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-widest text-center leading-relaxed">
            淹れたてのお茶と<br />優しいミルクの出会い
          </h1>
        </div>
      </section>

      {/* メッセージ */}
      <section className="px-6 py-24 max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <img src="/icon.png" alt="KENOCHA Logo" className="w-24 h-24 object-contain mix-blend-multiply opacity-90" />
        </div>
        <p className="leading-loose text-gray-700 md:text-lg mb-10">
          厳選された国産茶葉の豊かな香りと、<br className="hidden md:block" />
          なめらかなミルクが織りなす至福の一杯。<br />
          ご注文をいただいてから、一つひとつ丁寧にお淹れします。
        </p>
        <p className="text-sm text-gray-500 tracking-widest leading-loose">
          日替わりの茶葉、和青茶、釜炒り緑茶など、<br />
          ここでしか味わえない和の体験を。
        </p>
      </section>

      {/* メニュー紹介（静的でミニマルなレイアウト） */}
      <section className="px-6 py-24 bg-white w-full">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-16 text-center tracking-widest font-sans">MENU</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* メニューアイテム1 */}
            <div className="flex flex-col">
              <div className="aspect-square bg-gray-100 mb-8 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop" alt="ストレートティー" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-lg font-bold mb-4">ストレートティー</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                緑茶、ほうじ茶、和青茶、釜炒り緑茶など。それぞれの茶葉が持つ本来の香りや渋みを、最もピュアな形でお楽しみいただけます。
              </p>
            </div>

            {/* メニューアイテム2 */}
            <div className="flex flex-col">
              <div className="aspect-square bg-gray-100 mb-8 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop" alt="ミルクティー" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-lg font-bold mb-4">日本茶ミルクティー</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                しっかりとしたお茶の渋みと、ミルクのコクが調和する新感覚のドリンク。甘さや氷の量、トッピング（お茶ゼリー）のカスタマイズも可能です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* アクセス情報とモバイルオーダー（CTA） */}
      <section className="px-6 py-16 bg-gray-150 text-gray-900 w-full border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-8 tracking-widest font-sans">STORE & ORDER</h2>
            <p className="text-gray-700 mb-6 leading-loose text-sm md:text-base">
              当店はテイクアウト専門です。<br />
              スマートフォンから事前注文（モバイルオーダー）していただくと、店頭でお待たせせずにお渡しできます。
            </p>
            <div className="mb-6 text-gray-700 text-sm leading-loose">
              <p className="font-bold text-gray-900 mb-2">東神田店</p>
              <p>東京都千代田区東神田1-17-5 東神田イチオクビル2F</p>
            </div>

            {/* SNSリンク */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <a
                  href="https://x.com/kenochakanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (旧Twitter)"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/p/けの-ちゃ-61593245376286/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/kenocha2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            {isOpen ? (
              <a
                href="https://liff.line.me/2010897050-OfcoYNCh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-gray-900 px-10 py-5 font-bold tracking-widest hover:bg-opacity-90 transition-all shadow-md font-sans"
              >
                モバイルオーダーはこちら
              </a>
            ) : (
              <div className="flex flex-col items-start gap-2">
                <button
                  disabled
                  className="inline-block bg-gray-300 text-gray-500 px-10 py-5 font-bold tracking-widest cursor-not-allowed shadow-none font-sans"
                >
                  モバイルオーダーはこちら
                </button>
                <p className="text-xs text-red-600 font-bold font-sans">※只今は営業時間外です</p>
              </div>
            )}
            <p className="mt-4 text-xs text-gray-500">※モバイルオーダーはLINEミニアプリを使用するためスマホ推奨</p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {/* Google Mapの埋め込み */}
            <div className="aspect-square md:aspect-video w-full rounded overflow-hidden shadow-md border border-gray-900/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.267016663869!2d139.77887381149873!3d35.69504627246843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188f5a4b520079%3A0xb089606208190fdb!2z44GR44Gu44Gh44KD!5e0!3m2!1sja!2sus!4v1787897383831!5m2!1sja!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="けのちゃ 東神田店 地図"
              ></iframe>
            </div>

            {/* 営業時間 */}
            <div className="bg-white py-4 px-6 rounded shadow-sm border border-gray-900/5 text-gray-800">
              <h3 className="font-bold text-xs tracking-wider uppercase mb-2 text-gray-500 font-sans">BUSINESS HOURS</h3>
              <dl className="space-y-1.5 text-sm md:text-base leading-relaxed">
                {[
                  { day: "月曜日", time: "10:00 〜 15:00" },
                  { day: "火曜日", time: "10:00 〜 15:00" },
                  { day: "水曜日", time: "10:00 〜 15:00" },
                  { day: "木曜日", time: "10:00 〜 15:00" },
                  { day: "金曜日", time: "10:00 〜 15:00" },
                  { day: "土・日・祝日", time: "定休日" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-100 pb-1 last:border-0 last:pb-0">
                    <dt className="font-bold text-gray-900">{item.day}</dt>
                    <dd className={item.time === "定休日" ? "text-gray-400 font-sans" : "text-gray-800 font-sans"}>{item.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
