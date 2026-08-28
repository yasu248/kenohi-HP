export default function Tokushoho() {
  return (
    <main className="min-h-screen bg-[#fcfaf8] text-gray-800 font-serif pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-widest mb-6 text-center border-b pb-6 border-gray-200">
          特定商取引法に基づく表記
        </h1>
        
        <p className="leading-loose text-gray-600 mb-10 text-center text-sm md:text-base">
          当モバイルオーダーシステムをご利用いただくにあたり、法律に基づく表示事項を公開しています。
        </p>

        <div className="border-t border-gray-200 divide-y divide-gray-200 text-sm md:text-base">
          {/* 販売業者 */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">販売業者</dt>
            <dd className="font-medium text-gray-950">株式会社けのひ</dd>
          </div>

          {/* 運営責任者 */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">運営責任者</dt>
            <dd className="text-gray-800">神部駿維</dd>
          </div>

          {/* 所在地 */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">所在地</dt>
            <dd className="text-gray-800 leading-loose">
              〒101-0031<br />
              東京都千代田区東神田1-17-5 東神田イチオクビル2D
            </dd>
          </div>

          {/* 電話番号 */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">電話番号</dt>
            <dd className="text-gray-800">
              050-5585-1949
            </dd>
          </div>

          {/* メールアドレス */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">メールアドレス</dt>
            <dd className="text-gray-800 leading-loose">
              <a href="mailto:kenocha@kenohi-inc.jp" className="text-primary hover:underline">kenocha@kenohi-inc.jp</a><br />
              <span className="text-xs text-gray-500">※お問い合わせは恐れ入りますが、上記のメールアドレスまでお願いいたします。</span><br />
              <span className="text-xs text-gray-500">※ご連絡の際は「けのちゃ東神田店について」とご記載ください。</span>
            </dd>
          </div>

          {/* 販売価格 */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">販売価格</dt>
            <dd className="text-gray-800">
              各商品購入ページに表示（表示価格は消費税を含みます）
            </dd>
          </div>

          {/* 商品代金以外の必要料金 */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">商品代金以外の必要料金</dt>
            <dd className="text-gray-800">
              なし（テイクアウト注文のため配送料等はかかりません）
            </dd>
          </div>

          {/* お支払方法 */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">お支払方法</dt>
            <dd className="text-gray-800 leading-loose">
              クレジットカード決済（Visa, Mastercard, JCB, Amex, Diners, Discover）<br />
              PayPay決済（オンライン決済）
            </dd>
          </div>

          {/* お支払時期 */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">お支払時期</dt>
            <dd className="text-gray-800">
              ご注文確定時（Stripe決済プラットフォーム経由）
            </dd>
          </div>

          {/* 商品の引渡時期 */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">商品の引渡時期</dt>
            <dd className="text-gray-800">
              ご注文確定後、店舗にてご指定いただいた時間、または即時に調理を完了し店頭にてお渡しいたします。
            </dd>
          </div>

          {/* 返品・交換・キャンセル */}
          <div className="py-6 flex flex-col md:flex-row gap-4 md:gap-12">
            <dt className="text-gray-500 w-48 shrink-0 font-sans font-bold tracking-wider">返品・交換・キャンセル</dt>
            <dd className="text-gray-800 leading-loose">
              商品の性質上（食品・飲料）、ご注文確定後のお客様都合によるキャンセル・変更・返品・返金は承っておりません。<br />
              万が一、お受け取りになった商品に品違いや不備があった場合は、店頭スタッフへ直接お申し出いただくか、上記連絡先（メールアドレス）までご連絡ください。直ちに作り直し等の対応をさせていただきます。
            </dd>
          </div>
        </div>
      </div>
    </main>
  );
}
