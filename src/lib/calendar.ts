// 日本の国民の祝日を自動計算（ハッピーマンデー、春分・秋分、振替休日、国民の休日対応）
export function getJapaneseHolidays(year: number, month: number): Record<string, string> {
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
export const TEMPORARY_CLOSURES: Record<string, string> = {
  "2026-09-11": "臨時休業（研修・設備点検）",
  "2026-09-24": "臨時休業（店舗メンテナンス）",
  "2026-09-25": "臨時休業（店舗メンテナンス）",
};

export interface CalendarDayItem {
  dateStr: string;
  dayNum: number;
  dayOfWeek: number; // 0: 日, 1: 月, ... 6: 土
  isClosed: boolean;
  isTempClosed: boolean;
  tempClosedReason?: string;
  isRegularClosed: boolean;
  isHoliday: boolean;
  holidayName?: string;
  isToday: boolean;
}

export function getMonthCalendarData(year: number, month: number, customClosures: Record<string, string> = TEMPORARY_CLOSURES): (CalendarDayItem | null)[] {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const holidays = getJapaneseHolidays(year, month);
  const result: (CalendarDayItem | null)[] = [];

  // 月初の前の空白セル
  for (let i = 0; i < firstDayOfWeek; i++) {
    result.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = (firstDayOfWeek + d - 1) % 7;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const holidayName = holidays[dateStr];
    const isHoliday = Boolean(holidayName);
    const tempClosedReason = customClosures[dateStr];
    const isTempClosed = Boolean(tempClosedReason);
    const isRegularClosed = dayOfWeek === 0 || dayOfWeek === 6 || isHoliday;
    const isClosed = isRegularClosed || isTempClosed;
    const isToday = year === todayYear && month === todayMonth && d === todayDate;

    result.push({
      dateStr,
      dayNum: d,
      dayOfWeek,
      isClosed,
      isTempClosed,
      tempClosedReason,
      isRegularClosed,
      isHoliday,
      holidayName,
      isToday,
    });
  }

  return result;
}

export const STORE_DEFAULT_INFO = {
  name: "けのちゃ 東神田店",
  subtitle: "日本茶ミルクティー専門店",
  hours: "10:00 〜 15:00",
  businessDays: "月曜日 〜 金曜日（平日）",
  closedDays: "土曜・日曜・祝日",
  address: "東京都千代田区東神田1-2-3",
  instagram: "@kenocha_jp",
  line: "@kenocha",
  concept: "淹れたてのお茶と優しいミルクの出会い",
};
