import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f9f9f9] border-t border-gray-200 text-gray-600 py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* ブランド情報 */}
        <div className="md:col-span-1 flex flex-col">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 tracking-widest text-lg mb-4">
            <img src="/icon.png" alt="KENOHI Logo" className="w-8 h-8 rounded-full bg-white p-0.5 object-contain" />
            <span>KENOHI Inc.</span>
          </Link>
          <p className="text-sm leading-loose">
            株式会社けのひ<br />
            〒101-0031<br />
            東京都千代田区東神田1-17-5<br />
            東神田イチオクビル2F
          </p>
        </div>

        {/* リンク集 1 */}
        <div className="md:col-span-1 font-sans">
          <h4 className="font-bold text-gray-900 tracking-widest mb-6 text-sm">COMPANY</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/#news" className="hover:text-gray-900 transition-colors">ニュース (NEWS)</Link></li>
            <li><Link href="/#about" className="hover:text-gray-900 transition-colors">企業理念 (ABOUT US)</Link></li>
            <li><Link href="/#contact" className="hover:text-gray-900 transition-colors">お問い合わせ (CONTACT)</Link></li>
          </ul>
        </div>

        {/* リンク集 2 */}
        <div className="md:col-span-1 font-sans">
          <h4 className="font-bold text-gray-900 tracking-widest mb-6 text-sm">SERVICES</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/kenocha" className="hover:text-gray-900 transition-colors">けのちゃ (PRODUCTS)</Link></li>
          </ul>
        </div>

        {/* リンク集 3 */}
        <div className="md:col-span-1 font-sans">
          <h4 className="font-bold text-gray-900 tracking-widest mb-6 text-sm">LEGAL</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">プライバシーポリシー</Link></li>
            <li><Link href="/tokushoho" className="hover:text-gray-900 transition-colors">特定商取引法に基づく表記</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200 text-xs text-center md:text-left text-gray-400 font-sans flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} KENOHI Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
