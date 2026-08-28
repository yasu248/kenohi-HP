export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#fcfaf8] text-gray-800 font-serif pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-widest mb-12 text-center border-b pb-6 border-gray-200">
          プライバシーポリシー
        </h1>

        <p className="leading-loose text-gray-600 mb-10 text-sm md:text-base">
          株式会社けのひ（以下「弊社」）は、当モバイルオーダーシステムの運営において、お客様の個人情報を安全かつ適切に取り扱います。
        </p>

        <div className="space-y-12">
          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold mb-4 tracking-widest text-gray-900 border-l-2 border-primary pl-4">
              1. 個人情報の取得について
            </h2>
            <p className="leading-loose text-gray-700 text-sm md:text-base mb-4">
              当サービスでは、お客様がモバイルオーダー（注文・決済）を利用される際、以下の個人情報を適切に取得いたします。
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-700 text-sm md:text-base leading-loose">
              <li>LINEのプロフィール情報（表示名、ユーザー識別子、プロフィール画像のURL）</li>
              <li>ご注文いただいた商品の履歴、金額、日時</li>
              <li>決済時の処理に関連する情報（※クレジットカード番号などの情報は決済代行会社であるStripeが直接保持し、弊社側では保持いたしません）</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold mb-4 tracking-widest text-gray-900 border-l-2 border-primary pl-4">
              2. 個人情報の利用目的
            </h2>
            <p className="leading-loose text-gray-700 text-sm md:text-base mb-4">
              取得した個人情報は、以下の目的で利用いたします。これ以外の目的で利用することはございません。
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-700 text-sm md:text-base leading-loose">
              <li>ご注文いただいた商品の調理および店頭でのお渡し</li>
              <li>決済手続きおよび領収証等の発行処理</li>
              <li>ご注文に関するご連絡やお問い合わせへの対応</li>
              <li>サービス向上のための統計的な分析</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold mb-4 tracking-widest text-gray-900 border-l-2 border-primary pl-4">
              3. 個人情報の第三者提供について
            </h2>
            <p className="leading-loose text-gray-700 text-sm md:text-base mb-4">
              弊社は、以下のいずれかに該当する場合を除き、お客様の個人情報を第三者に提供または開示いたしません。
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-700 text-sm md:text-base leading-loose">
              <li>お客様の同意がある場合</li>
              <li>決済処理を行うために、決済代行会社（Stripe等）に必要な情報を転送する場合</li>
              <li>法令に基づき開示が必要と判断される場合</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold mb-4 tracking-widest text-gray-900 border-l-2 border-primary pl-4">
              4. 個人情報の安全管理
            </h2>
            <p className="leading-loose text-gray-700 text-sm md:text-base">
              弊社は、お客様の個人情報への不正アクセス、紛失、改ざん、漏洩を防ぐため、セキュリティの維持、適切な管理体制の構築など必要な措置を講じ、厳重に個人情報を管理いたします。
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold mb-4 tracking-widest text-gray-900 border-l-2 border-primary pl-4">
              5. 個人情報の開示・訂正・削除
            </h2>
            <p className="leading-loose text-gray-700 text-sm md:text-base">
              お客様がご自身の個人情報の開示、訂正、または削除を希望される場合は、ご本人であることを確認の上、速やかに対応いたします。下記のお問い合わせ窓口までご連絡ください。
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold mb-4 tracking-widest text-gray-900 border-l-2 border-primary pl-4">
              6. お問い合わせ窓口
            </h2>
            <p className="leading-loose text-gray-700 text-sm md:text-base">
              個人情報の取り扱いに関するお問い合わせは、以下の窓口までご連絡ください。
            </p>
            <div className="mt-4 bg-white p-6 border border-gray-100 rounded text-sm md:text-base leading-loose">
              <p className="font-bold text-gray-900">運営会社：株式会社けのひ</p>
              <p>メールアドレス：<a href="mailto:kenocha@kenohi-inc.jp" className="text-primary hover:underline">kenocha@kenohi-inc.jp</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
