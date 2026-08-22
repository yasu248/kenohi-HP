export default function Kenocha() {
  return (
    <main className="min-h-screen bg-[#fcfaf8] text-gray-800 font-serif">
      {/* 共通のHeaderが上部に来るため、トップイメージは画面の一番上から始まるようにネガティブマージンかそのまま配置します */}
      
      {/* トップイメージ */}
      <section className="w-full h-[60vh] relative overflow-hidden bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2000&auto=format&fit=crop" 
          alt="けのちゃのお茶" 
          className="object-cover w-full h-full animate-slow-zoom"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-widest text-center leading-relaxed">
            淹れたてのお茶と<br />優しいミルクの出会い
          </h1>
        </div>
      </section>

      {/* メッセージ */}
      <section className="px-6 py-24 max-w-3xl mx-auto text-center">
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
                <img src="https://images.unsplash.com/photo-1620082260666-4190c422896f?q=80&w=800&auto=format&fit=crop" alt="ミルクティー" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-lg font-bold mb-4">日本茶ミルクティー</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                しっかりとしたお茶の渋みと、ミルクのコクが調和する新感覚のドリンク。甘さや氷の量、トッピング（緑茶ゼリーなど）のカスタマイズも可能です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* アクセス情報とモバイルオーダー（CTA） */}
      <section className="px-6 py-32 bg-[#3b4d3e] text-white w-full">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-8 tracking-widest font-sans">STORE & ORDER</h2>
            <p className="text-white/80 mb-6 leading-loose text-sm md:text-base">
              当店はテイクアウト専門です。<br />
              スマートフォンから事前注文（モバイルオーダー）していただくと、店頭でお待たせせずにお渡しできます。
            </p>
            <div className="mb-10 text-white/80 text-sm leading-loose">
              <p className="font-bold text-white mb-2">東神田店</p>
              <p>東京都千代田区東神田1-17-5 東神田イチオクビル2D</p>
            </div>
            {/* ※実際のLINEミニアプリのURLに差し替えてください */}
            <a 
              href="#" 
              className="inline-block bg-white text-[#3b4d3e] px-10 py-5 font-bold tracking-widest hover:bg-gray-100 transition-colors shadow-lg font-sans"
            >
              モバイルオーダーはこちら
            </a>
          </div>
          <div className="w-full md:w-1/2">
            {/* 地図のプレースホルダー */}
            <div className="aspect-square md:aspect-video bg-[#2c392f] rounded flex items-center justify-center border border-white/10 p-8 text-center text-white/50 text-sm">
              (Google Map)
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
