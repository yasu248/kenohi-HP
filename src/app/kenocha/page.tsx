export default function Kenocha() {
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
      <section className="px-6 py-32 bg-gray-150 text-gray-900 w-full border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-8 tracking-widest font-sans">STORE & ORDER</h2>
            <p className="text-gray-700 mb-6 leading-loose text-sm md:text-base">
              当店はテイクアウト専門です。<br />
              スマートフォンから事前注文（モバイルオーダー）していただくと、店頭でお待たせせずにお渡しできます。
            </p>
            <div className="mb-10 text-gray-700 text-sm leading-loose">
              <p className="font-bold text-gray-900 mb-2">東神田店</p>
              <p>東京都千代田区東神田1-17-5 東神田イチオクビル2D</p>
            </div>
            <a
              href="https://liff.line.me/2010897050-OfcoYNCh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-gray-900 px-10 py-5 font-bold tracking-widest hover:bg-opacity-90 transition-all shadow-md font-sans"
            >
              モバイルオーダーはこちら
            </a>
            <p className="mt-4 text-xs text-gray-500">※モバイルオーダーはLINEミニアプリを使用するためスマホ推奨</p>
          </div>
          <div className="w-full md:w-1/2">
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
          </div>
        </div>
      </section>
    </main>
  );
}
