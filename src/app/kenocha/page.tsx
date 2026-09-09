"use client";

import { useState, useEffect } from "react";

// 日本の国民の祝日を自動計算（ハッピーマンデー、春分・秋分、振替休日、国民の休日対応）
function getJapaneseHolidays(year: number, month: number): Record<string, string> {
  const formatDate = (m: number, d: number) =>
    `${year}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  // 第N月曜日の日付を計算
  const getNthMonday = (m: number, nth: number): number => {
    const firstDay = new Date(year, m, 1).getDay(); // 0: 日, 1: 月...
    const firstMonday = firstDay <= 1 ? 2 - firstDay : 9 - firstDay;
    return firstMonday + (nth - 1) * 7;
  };

  // 春分の日 (1980〜2099年略算式)
  const getVernalEquinoxDay = (y: number): number => {
    return Math.floor(20.8431 + 0.242194 * (y - 1980) - Math.floor((y - 1980) / 4));
  };
  // 秋分の日 (1980〜2099年略算式)
  const getAutumnalEquinoxDay = (y: number): number => {
    return Math.floor(23.2488 + 0.242194 * (y - 1980) - Math.floor((y - 1980) / 4));
  };

  const rawHolidays: { month: number; day: number; name: string }[] = [];

  // 1月
  rawHolidays.push({ month: 0, day: 1, name: "元日" });
  rawHolidays.push({ month: 0, day: getNthMonday(0, 2), name: "成人の日" });

  // 2月
  rawHolidays.push({ month: 1, day: 11, name: "建国記念の日" });
  if (year >= 2020) {
    rawHolidays.push({ month: 1, day: 23, name: "天皇誕生日" });
  }

  // 3月
  rawHolidays.push({ month: 2, day: getVernalEquinoxDay(year), name: "春分の日" });

  // 4月
  rawHolidays.push({ month: 3, day: 29, name: "昭和の日" });

  // 5月
  rawHolidays.push({ month: 4, day: 3, name: "憲法記念日" });
  rawHolidays.push({ month: 4, day: 4, name: "みどりの日" });
  rawHolidays.push({ month: 4, day: 5, name: "こどもの日" });

  // 7月
  rawHolidays.push({ month: 6, day: getNthMonday(6, 3), name: "海の日" });

  // 8月
  if (year >= 2016) {
    rawHolidays.push({ month: 7, day: 11, name: "山の日" });
  }

  // 9月
  const respectForTheAgedDay = getNthMonday(8, 3);
  const autumnalEquinoxDay = getAutumnalEquinoxDay(year);
  rawHolidays.push({ month: 8, day: respectForTheAgedDay, name: "敬老の日" });
  rawHolidays.push({ month: 8, day: autumnalEquinoxDay, name: "秋分の日" });

  // 10月
  rawHolidays.push({ month: 9, day: getNthMonday(9, 2), name: "スポーツの日" });

  // 11月
  rawHolidays.push({ month: 10, day: 3, name: "文化の日" });
  rawHolidays.push({ month: 10, day: 23, name: "勤労感謝の日" });

  const yearHolidayMap: Record<string, string> = {};
  rawHolidays.forEach((h) => {
    yearHolidayMap[formatDate(h.month, h.day)] = h.name;
  });

  // 国民の休日判定（祝日と祝日に挟まれた平日）
  if (respectForTheAgedDay + 2 === autumnalEquinoxDay) {
    const sandwichDay = respectForTheAgedDay + 1;
    const sandwichDate = formatDate(8, sandwichDay);
    if (!yearHolidayMap[sandwichDate]) {
      yearHolidayMap[sandwichDate] = "国民の休日";
    }
  }

  // 振替休日判定（祝日が日曜日の場合、翌日以降の最初の平日）
  const sortedDates = Object.keys(yearHolidayMap).sort();
  for (const dateKey of sortedDates) {
    const [y, m, d] = dateKey.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    if (dateObj.getDay() === 0) {
      const subDate = new Date(y, m - 1, d + 1);
      while (yearHolidayMap[`${y}-${String(subDate.getMonth() + 1).padStart(2, "0")}-${String(subDate.getDate()).padStart(2, "0")}`]) {
        subDate.setDate(subDate.getDate() + 1);
      }
      const subKey = `${y}-${String(subDate.getMonth() + 1).padStart(2, "0")}-${String(subDate.getDate()).padStart(2, "0")}`;
      yearHolidayMap[subKey] = "振替休日";
    }
  }

  // 表示対象の月のみを抽出して返却
  const targetMonthHolidays: Record<string, string> = {};
  for (const [key, name] of Object.entries(yearHolidayMap)) {
    const [y, m] = key.split("-").map(Number);
    if (y === year && m - 1 === month) {
      targetMonthHolidays[key] = name;
    }
  }

  return targetMonthHolidays;
}

// 臨時休業日の設定 (YYYY-MM-DD: 理由またはラベル)
const TEMPORARY_CLOSURES: Record<string, string> = {
  "2026-09-11": "臨時休業",
  "2026-09-24": "臨時休業",
  "2026-09-25": "臨時休業",
};

export default function Kenocha() {
  const [isOpen, setIsOpen] = useState(false);
  const [calDate, setCalDate] = useState(() => new Date());

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
        const year = jstDate.getFullYear();
        const month = jstDate.getMonth();
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(jstDate.getDate()).padStart(2, "0")}`;
        const holidays = getJapaneseHolidays(year, month);
        if (holidays[dateStr] || TEMPORARY_CLOSURES[dateStr]) {
          return false;
        }

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

  const calYear = calDate.getFullYear();
  const calMonth = calDate.getMonth();

  const handlePrevMonth = () => {
    setCalDate(new Date(calYear, calMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCalDate(new Date(calYear, calMonth + 1, 1));
  };

  // カレンダーの日付配列生成
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // 現在表示している年月の祝日マップを自動算出
  const currentMonthHolidays = getJapaneseHolidays(calYear, calMonth);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = (firstDayOfWeek + d - 1) % 7;
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const holidayName = currentMonthHolidays[dateStr];
    const isTempClosed = Boolean(TEMPORARY_CLOSURES[dateStr]);
    const isRegularClosed = dayOfWeek === 0 || dayOfWeek === 6 || Boolean(holidayName);
    const isClosed = isRegularClosed || isTempClosed;
    const isToday = calYear === todayYear && calMonth === todayMonth && d === todayDate;

    calendarDays.push({
      dayNum: d,
      dayOfWeek,
      isClosed,
      isTempClosed,
      isToday,
      holidayName,
    });
  }

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
          一つひとつ丁寧にお淹れします。
        </p>
        <p className="text-sm text-gray-500 tracking-widest leading-loose">
          日替わりのお茶、青茶、釜炒り緑茶など、<br />
          ここでしか味わえない和の体験を。
        </p>
      </section>

      {/* ニュース・お知らせ (NEWS & TOPICS) */}
      <section className="px-6 py-20 bg-white w-full border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-gray-200 gap-2">
            <div>
              <span className="text-xs text-primary font-bold tracking-widest uppercase font-sans">INFORMATION</span>
              <h2 className="text-2xl font-bold tracking-widest font-sans mt-1">NEWS & TOPICS</h2>
            </div>
            <p className="text-xs text-gray-500 font-sans">けのちゃからのお知らせ</p>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 3,
                date: "2026.09.09",
                category: "休業情報",
                categoryStyle: "bg-amber-50 text-amber-800 border-amber-200",
                title: "9月の臨時休業日のお知らせ（9月11日・24日・25日）",
                desc: "誠に勝手ながら、2026年9月11日(金)、24日(木)、25日(金)は店舗メンテナンスおよび研修のため臨時休業とさせていただきます。ご来店を予定されていたお客様にはご不便をおかけいたしますが、何卒ご理解賜りますようお願い申し上げます。",
              },
              {
                id: 2,
                date: "2026.08.25",
                category: "お知らせ",
                categoryStyle: "bg-amber-50 text-amber-800 border-amber-200",
                title: "LINE公式アカウントから事前注文（モバイルオーダー）が9月14日(月)より利用可能になります!",
                desc: "店頭でお待たせせずにスムーズにお受け取りいただけるモバイルオーダーを導入いたしました。スマホから簡単にご注文いただけます。",
              },
              {
                id: 1,
                date: "2026.08.15",
                category: "OPEN",
                categoryStyle: "bg-primary/20 text-gray-900 border-primary/40",
                title: "日本茶ミルクティー専門店「けのちゃ 東神田店」がグランドオープン！",
                desc: "淹れたての日本茶の香りとコクのあるミルクのハーモニーをお届けするテイクアウト専門店がオープンいたしました。",
              },
            ].map((news) => (
              <article
                key={news.id}
                className="p-5 rounded border border-gray-100 bg-[#fcfaf8]"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <time className="text-xs text-gray-500 font-sans tracking-wider">{news.date}</time>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-sans font-medium ${news.categoryStyle}`}>
                    {news.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-1.5">{news.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{news.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* メニュー紹介（静的でミニマルなレイアウト） */}
      <section className="px-6 py-24 bg-[#fcfaf8] w-full border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-16 text-center tracking-widest font-sans">MENU</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* メニューアイテム1 */}
            <div className="flex flex-col">
              <div className="aspect-square bg-gray-100 mb-8 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop" alt="ストレートティー" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold mb-4">ストレートティー</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                緑茶、ほうじ茶、和青茶、釜炒り緑茶など。それぞれの茶葉が持つ本来の香りや渋みを、最もピュアな形でお楽しみいただけます。
              </p>
            </div>

            {/* メニューアイテム2 */}
            <div className="flex flex-col">
              <div className="aspect-square bg-gray-100 mb-8 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop" alt="ミルクティー" className="w-full h-full object-cover" />
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
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16">
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
          <div className="w-full md:w-1/2 flex flex-col gap-6">
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

            {/* 営業時間 & 営業カレンダー */}
            <div className="bg-white p-5 md:p-6 rounded shadow-sm border border-gray-900/5 text-gray-800">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                <div>
                  <h3 className="font-bold text-xs tracking-wider uppercase text-gray-500 font-sans">BUSINESS CALENDAR</h3>
                  <p className="text-sm font-bold text-gray-900 font-sans">
                    {calYear}年 {calMonth + 1}月
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevMonth}
                    aria-label="前月"
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextMonth}
                    aria-label="翌月"
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* カレンダーグリッド */}
              <div className="grid grid-cols-7 gap-1 text-center font-sans text-xs mb-3">
                <div className="text-red-500 font-bold py-1">日</div>
                <div className="text-gray-600 font-bold py-1">月</div>
                <div className="text-gray-600 font-bold py-1">火</div>
                <div className="text-gray-600 font-bold py-1">水</div>
                <div className="text-gray-600 font-bold py-1">木</div>
                <div className="text-gray-600 font-bold py-1">金</div>
                <div className="text-blue-500 font-bold py-1">土</div>

                {calendarDays.map((item, idx) => {
                  if (!item) {
                    return <div key={`empty-${idx}`} className="h-10" />;
                  }

                  const { dayNum, isClosed, isTempClosed, isToday, holidayName } = item;
                  return (
                    <div
                      key={`day-${dayNum}`}
                      className={`h-10 flex flex-col items-center justify-center rounded transition-all text-xs relative ${isToday
                        ? "bg-primary/20 font-bold ring-1 ring-primary"
                        : isTempClosed
                          ? "bg-amber-50/80 text-amber-900 border border-amber-200/80"
                          : isClosed
                            ? "bg-gray-50 text-gray-400"
                            : "bg-white text-gray-800 hover:bg-gray-50"
                        }`}
                      title={isTempClosed ? "臨時休業" : holidayName ? `${holidayName} (定休日)` : isClosed ? "定休日" : "通常営業 10:00〜15:00"}
                    >
                      <span className={`text-[11px] leading-tight ${isTempClosed ? "text-amber-800 font-bold" : item.dayOfWeek === 0 || holidayName ? "text-red-500" : item.dayOfWeek === 6 ? "text-blue-500" : ""}`}>
                        {dayNum}
                      </span>
                      <span className="text-[9px] scale-90 leading-tight">
                        {isTempClosed ? (
                          <span className="text-amber-800 font-bold text-[7.5px] tracking-tighter whitespace-nowrap">臨時休業</span>
                        ) : isClosed ? (
                          <span className="text-gray-400">休</span>
                        ) : (
                          <span className="text-primary font-bold">10-15</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* 凡例 & 営業時間注釈 */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-[11px] text-gray-500 font-sans gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    <span>営業 (10:00〜15:00)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
                    <span>定休日 (土日祝)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                    <span>臨時休業</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">※平日の通常営業日</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

