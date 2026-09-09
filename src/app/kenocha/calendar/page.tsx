"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { toPng } from "html-to-image";
import {
  getMonthCalendarData,
  TEMPORARY_CLOSURES,
  STORE_DEFAULT_INFO,
} from "@/lib/calendar";

type AspectRatioType = "square" | "portrait" | "story" | "a4";
type ThemeType = "washi" | "white" | "dark";

export default function CalendarExportPage() {
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 8, 1)); // 2026年9月 (月は0-indexed: 8 = 9月)
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>("square");
  const [theme, setTheme] = useState<ThemeType>("washi");
  const [isExporting, setIsExporting] = useState(false);
  const [highlightToday, setHighlightToday] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleResetToCurrent = () => {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const calendarDays = getMonthCalendarData(year, month, TEMPORARY_CLOSURES);

  // PDF印刷ダイアログの起動
  const handlePrint = () => {
    window.print();
  };

  // 高画質PNG画像の生成・ダウンロード
  const handleDownloadPng = async () => {
    if (!calendarRef.current) return;
    try {
      setIsExporting(true);
      // html-to-image で Retina対応の高解像度PNG生成 (pixelRatio: 2.5)
      const dataUrl = await toPng(calendarRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: theme === "dark" ? "#1a201c" : theme === "white" ? "#ffffff" : "#fbf9f5",
      });

      const link = document.createElement("a");
      const monthStr = String(month + 1).padStart(2, "0");
      link.download = `kenocha-calendar-${year}-${monthStr}-${aspectRatio}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("画像の生成に失敗しました:", err);
      alert("画像の生成中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsExporting(false);
    }
  };

  // テーマに応じたスタイル設定
  const themeStyles = {
    washi: {
      sheetBg: "bg-[#fbf9f5]",
      textColor: "text-gray-800",
      subTextColor: "text-gray-600",
      accentColor: "#56b964",
      borderColor: "border-[#e5ded4]",
      cardBg: "bg-white/95 border-[#e5ded4]",
      // 普通の休日・定休日は枠線と文字を読める濃さに
      regularOffBg: "bg-[#f4efe8]/70 border-[#d3c9bd]",
      regularOffText: "text-gray-600 font-medium",
      regularOffBadge: "text-gray-600 bg-[#e5ded4] font-medium",
      // 臨時休業は薄く上品な淡いトーンでわかりやすく
      tempClosedBg: "bg-[#fef9f2] border border-[#f5cb98] shadow-xs",
      tempClosedBadge: "bg-[#fed7aa]/90 text-[#8c3d0c] font-bold border border-[#fbc07b]",
      tempClosedText: "text-[#b45309] font-extrabold",
      openBadge: "bg-[#56b964] text-white font-bold",
      headerBorder: "border-[#d8cfc2]",
      noticeBg: "bg-[#f4efe6] border-[#e2d8ca]",
    },
    white: {
      sheetBg: "bg-white",
      textColor: "text-gray-900",
      subTextColor: "text-gray-600",
      accentColor: "#16a34a",
      borderColor: "border-gray-200",
      cardBg: "bg-white border-gray-200 shadow-xs",
      // 普通の休日・定休日は枠線と文字を読める濃さに
      regularOffBg: "bg-gray-100/60 border-gray-300",
      regularOffText: "text-gray-600 font-medium",
      regularOffBadge: "text-gray-600 bg-gray-200 font-medium",
      // 臨時休業は薄く上品な淡いトーンでわかりやすく
      tempClosedBg: "bg-[#fffbf0] border border-[#fde68a] shadow-xs",
      tempClosedBadge: "bg-amber-100 text-amber-900 font-bold border border-amber-300",
      tempClosedText: "text-amber-800 font-extrabold",
      openBadge: "bg-emerald-600 text-white font-bold",
      headerBorder: "border-gray-200",
      noticeBg: "bg-gray-50 border-gray-200",
    },
    dark: {
      sheetBg: "bg-[#18211b]",
      textColor: "text-gray-100",
      subTextColor: "text-gray-300",
      accentColor: "#76dd84",
      borderColor: "border-[#2b3a30]",
      cardBg: "bg-[#202c24] border-[#2b3a30]",
      // 普通の休日・定休日は枠線と文字を読める濃さに
      regularOffBg: "bg-[#19231c]/70 border-[#38493d]",
      regularOffText: "text-gray-300 font-medium",
      regularOffBadge: "text-gray-300 bg-[#28392d] font-medium",
      // 臨時休業は薄く上品な淡いトーンでわかりやすく
      tempClosedBg: "bg-[#2e2318] border border-[#785429] shadow-xs",
      tempClosedBadge: "bg-[#4a341e] text-[#fde047] font-bold border border-[#785429]",
      tempClosedText: "text-[#fde047] font-extrabold",
      openBadge: "bg-[#76dd84] text-[#18211b] font-bold",
      headerBorder: "border-[#314336]",
      noticeBg: "bg-[#202c24] border-[#314336]",
    },
  }[theme];

  // アスペクト比のラッパークラス（各比率に厳密に最適化）
  const aspectClasses = {
    square: "w-full max-w-[700px] aspect-square",
    portrait: "w-full max-w-[640px] aspect-[4/5]",
    story: "w-full max-w-[480px] aspect-[9/16]",
    a4: "w-full max-w-[680px] aspect-[1/1.4142]",
  }[aspectRatio];

  return (
    <div className="min-h-screen bg-[#f3f0ea] pt-24 pb-20 px-4 font-serif print:p-0 print:m-0 print:bg-white">
      {/* 操作コントロールパネル (画面上部・印刷時は非表示) */}
      <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans text-gray-500 mb-1">
              <Link href="/kenocha" className="hover:text-gray-900 transition-colors flex items-center gap-1 font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                けのちゃトップに戻る
              </Link>
            </div>
            <h1 className="text-xl font-bold font-sans text-gray-900 flex items-center gap-2">
              <span>📅</span> 営業カレンダー 清書＆出力ツール
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              SNS（Instagram・X・LINE）への投稿画像や、店頭掲示・配布用PDFを作成できます。
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-xs font-sans font-bold hover:bg-gray-800 transition shadow flex items-center gap-2 cursor-pointer"
              title="ブラウザの印刷ダイアログからPDF保存または印刷を行います"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              PDFとして保存 / 印刷
            </button>
            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="px-4 py-2.5 bg-[#43a047] text-white rounded-lg text-xs font-sans font-bold hover:bg-[#388e3c] transition shadow flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              title="SNS投稿用の高解像度PNG画像をダウンロードします"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isExporting ? "画像生成中..." : "画像(PNG)を保存"}
            </button>
          </div>
        </div>

        {/* コントロール群 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
          {/* 年月切り替え */}
          <div>
            <label className="block text-xs font-bold text-gray-700 font-sans mb-2">表示年月</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                aria-label="前月"
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-xs font-sans font-medium cursor-pointer"
              >
                ◀ 前月
              </button>
              <div className="flex-1 text-center font-bold text-sm font-sans py-1 bg-gray-50 border border-gray-200 rounded">
                {year}年 {month + 1}月
              </div>
              <button
                onClick={handleNextMonth}
                aria-label="翌月"
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-xs font-sans font-medium cursor-pointer"
              >
                翌月 ▶
              </button>
            </div>
            <button
              onClick={handleResetToCurrent}
              className="mt-2 text-[11px] text-gray-500 hover:text-gray-800 underline font-sans cursor-pointer"
            >
              今月にリセット
            </button>
          </div>

          {/* フォーマット・比率切り替え */}
          <div>
            <label className="block text-xs font-bold text-gray-700 font-sans mb-2">画像・出力サイズ</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
              <button
                onClick={() => setAspectRatio("square")}
                className={`py-1.5 px-2 text-xs font-sans rounded border text-center transition-all cursor-pointer ${aspectRatio === "square"
                  ? "bg-gray-900 text-white border-gray-900 font-bold shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                📸 1:1 (正方形)
              </button>
              <button
                onClick={() => setAspectRatio("portrait")}
                className={`py-1.5 px-2 text-xs font-sans rounded border text-center transition-all cursor-pointer ${aspectRatio === "portrait"
                  ? "bg-gray-900 text-white border-gray-900 font-bold shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                🖼️ 4:5 (縦長フィード)
              </button>
              <button
                onClick={() => setAspectRatio("story")}
                className={`py-1.5 px-2 text-xs font-sans rounded border text-center transition-all cursor-pointer ${aspectRatio === "story"
                  ? "bg-gray-900 text-white border-gray-900 font-bold shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                📱 9:16 (ストーリー)
              </button>
              <button
                onClick={() => setAspectRatio("a4")}
                className={`py-1.5 px-2 text-xs font-sans rounded border text-center transition-all cursor-pointer ${aspectRatio === "a4"
                  ? "bg-gray-900 text-white border-gray-900 font-bold shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                📄 A4 縦 (印刷)
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="highlightToday"
                checked={highlightToday}
                onChange={(e) => setHighlightToday(e.target.checked)}
                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
              />
              <label htmlFor="highlightToday" className="text-[11px] text-gray-600 font-sans cursor-pointer">
                「今日」の日付枠を強調表示する
              </label>
            </div>
          </div>

          {/* 配色テーマ切り替え */}
          <div>
            <label className="block text-xs font-bold text-gray-700 font-sans mb-2">カラーテーマ</label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setTheme("washi")}
                className={`py-1.5 px-2 text-xs font-sans rounded border text-center transition-all cursor-pointer ${theme === "washi"
                  ? "bg-[#56b964] text-white border-[#56b964] font-bold shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                🍵 和モダン
              </button>
              <button
                onClick={() => setTheme("white")}
                className={`py-1.5 px-2 text-xs font-sans rounded border text-center transition-all cursor-pointer ${theme === "white"
                  ? "bg-gray-900 text-white border-gray-900 font-bold shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                ⚪ シンプル白
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`py-1.5 px-2 text-xs font-sans rounded border text-center transition-all cursor-pointer ${theme === "dark"
                  ? "bg-[#18211b] text-[#76dd84] border-[#18211b] font-bold shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                🍂 濃茶ダーク
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* プレビュー＆印刷・画像出力対象エリア */}
      <div className="flex justify-center calendar-print-container">
        <div
          ref={calendarRef}
          id="calendar-print-target"
          className={`${aspectClasses} ${themeStyles.sheetBg} ${themeStyles.textColor} p-6 md:p-8 rounded-2xl shadow-xl border ${themeStyles.borderColor} flex flex-col justify-between transition-all duration-300 print:shadow-none print:border-none print:rounded-none print:max-w-full print:w-full print:p-6`}
          style={{ boxSizing: "border-box" }}
        >
          {/* ヘッダー */}
          <div className={`pb-3 mb-2 border-b ${themeStyles.headerBorder} ${aspectRatio === "portrait" ? "mt-8 md:mt-12" : aspectRatio === "story" ? "mt-16 md:mt-24" : ""}`}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/icon.png"
                  alt="KENOCHA"
                  className={`object-contain rounded-full bg-white/80 p-1 shadow-sm border border-gray-200/50 transition-all ${aspectRatio === "portrait" || aspectRatio === "square" ? "w-12 h-12 md:w-14 md:h-14" : "w-10 h-10"}`}
                />
                <div>
                  <h2 className={`font-bold tracking-wider transition-all ${aspectRatio === "portrait" || aspectRatio === "square" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
                    {STORE_DEFAULT_INFO.name}
                  </h2>
                </div>
              </div>

              {/* 年月メイン表示 */}
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-bold tracking-tight font-sans text-[#56b964] flex items-baseline justify-end gap-1">
                  <span>{year}</span>
                  <span className="text-sm font-normal text-gray-500">年</span>
                  <span className="text-3xl md:text-4xl ml-1 font-extrabold">{month + 1}</span>
                  <span className="text-base font-normal text-gray-500">月</span>
                </div>
              </div>
            </div>
          </div>

          {/* カレンダーグリッド (比率に合わせて綺麗に全体を満たす) */}
          <div className={`w-full flex-1 flex flex-col ${aspectRatio === "portrait" || aspectRatio === "story" ? "justify-center" : "justify-between"} pt-1`}>
            {/* 曜日ヘッダー (土日は目立たないグレーに) */}
            <div className="grid grid-cols-7 gap-2 text-center font-sans text-xs font-bold mb-1.5 pb-1 border-b border-gray-200/50">
              <div className="py-0.5 text-gray-400 font-medium">日 (SUN)</div>
              <div className="py-0.5">月 (MON)</div>
              <div className="py-0.5">火 (TUE)</div>
              <div className="py-0.5">水 (WED)</div>
              <div className="py-0.5">木 (THU)</div>
              <div className="py-0.5">金 (FRI)</div>
              <div className="py-0.5 text-gray-400 font-medium">土 (SAT)</div>
            </div>

            {/* 日付セル */}
            <div className={`grid grid-cols-7 gap-2 text-center font-sans w-full ${aspectRatio === "portrait" || aspectRatio === "story" ? "aspect-square max-h-[80%]" : "flex-1"}`}>
              {calendarDays.map((item, idx) => {
                if (!item) {
                  return (
                    <div
                      key={`empty-${idx}`}
                      className="h-full min-h-[54px] rounded-lg opacity-15 border border-dashed border-gray-300"
                    />
                  );
                }

                const { dayNum, isClosed, isTempClosed, isToday, holidayName } = item;
                const isRegularOff = isClosed && !isTempClosed; // 通常の休日・定休日（土日祝）

                return (
                  <div
                    key={`day-${dayNum}`}
                    className={`h-full min-h-[54px] p-1.5 flex flex-col items-center rounded-lg border transition-all text-xs relative ${isTempClosed
                      ? themeStyles.tempClosedBg
                      : isRegularOff
                        ? themeStyles.regularOffBg
                        : `${themeStyles.cardBg} ${themeStyles.borderColor}`
                      } ${highlightToday && isToday
                        ? "ring-2 ring-[#56b964] font-bold shadow-md z-10"
                        : ""
                      }`}
                  >
                    {/* 日付番号 & 祝日名 */}
                    <div className="w-full flex items-center justify-between px-0.5">
                      <span
                        className={`text-sm md:text-base leading-none ${isTempClosed
                          ? `${themeStyles.tempClosedText} text-base md:text-lg`
                          : isRegularOff
                            ? themeStyles.regularOffText
                            : `${themeStyles.textColor} font-bold`
                          }`}
                      >
                        {dayNum}
                      </span>
                      {holidayName && (
                        <span className={`text-[7.5px] leading-tight px-1 py-0.5 rounded whitespace-nowrap ${isTempClosed
                          ? "bg-amber-100 text-amber-900 font-bold"
                          : "bg-gray-200 text-gray-600 font-medium"
                          }`}>
                          {holidayName}
                        </span>
                      )}
                    </div>

                    {/* ステータスバッジ */}
                    <div className="w-full mt-auto pt-0.5 flex justify-center">
                      {isTempClosed ? (
                        <span className={`${aspectRatio === 'story' ? 'text-[7px] px-1' : 'text-[9px] md:text-[10px] px-2'} py-0.5 rounded font-black tracking-tighter ${themeStyles.tempClosedBadge} whitespace-nowrap`}>
                          臨時休業
                        </span>
                      ) : isRegularOff ? (
                        <span className={`${aspectRatio === 'story' ? 'text-[7.5px] px-1' : 'text-[8.5px] md:text-[9.5px] px-2'} py-0.5 rounded font-medium ${themeStyles.regularOffBadge} whitespace-nowrap`}>
                          定休
                        </span>
                      ) : (
                        <span className={`${aspectRatio === 'story' ? 'text-[6.5px] px-0.5' : 'text-[8.5px] md:text-[9.5px] px-1.5'} py-0.5 rounded font-bold ${themeStyles.openBadge} shadow-xs whitespace-nowrap tracking-tighter`}>
                          10:00-15:00
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
