# Codex サイト全体監査レポート (2026-09-01)

> 実行: scripts/codex-review.sh --effort high (ChatGPT枠) / 274,887 tokens

監査はコード変更なしで実施しました。`.env` 系・`node_modules`・`dist`・`build`・`test-results` は読み取っていません。作業ツリー外での本番ビルドは成功しています。

## 優先度：高

- [index.html](/Users/ishiharayuuta/UsKikaku-Officialsite-1/index.html:15) トップページ用OGPが静的HTMLに固定され、各一覧・会社・サービスページではHelmetがOGPを差し替えていません。記事詳細でも静的タグと動的タグが重複する可能性があります。SNSクローラーはJavaScript実行前のトップページ情報を取得するため、全ルートをSSG／プリレンダリングし、共通`Seo`コンポーネントからtitle・description・canonical・OGP・Twitterタグを一式出力してください。CSRは正確なOGP表示が難しいこともmicroCMS公式で案内されています。[microCMS公式](https://document.microcms.io/manual/rendering-methods)

- [src/pages/NewsDetail.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/pages/NewsDetail.tsx:116) ニュース・ブログ詳細にcanonicalがなく、`og:url`に`window.location.href`を使っているため、UTMパラメーター等を含むURLが共有されます。[BlogDetail.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/pages/BlogDetail.tsx:128)も同様です。`https://us-kikaku.com/news/{id}`等を明示し、OG画像がない場合の既定画像、記事description、`article:published_time`も設定してください。

- [netlify.toml](/Users/ishiharayuuta/UsKikaku-Officialsite-1/netlify.toml:6) `/* → /index.html`を常にHTTP 200で返すため、存在しないURLもsoft 404になります。[public/sitemap.xml](/Users/ishiharayuuta/UsKikaku-Officialsite-1/public/sitemap.xml:1)にもCMS記事URLがありません。プリレンダリング時に静的ルート・CMS詳細・サイトマップを生成し、未知のURLは実際の404レスポンスにしてください。

- [src/lib/client.ts](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/lib/client.ts:5) `VITE_MICROCMS_API_KEY`はJSバンドルから取得可能です。実環境の権限は確認できませんが、WRITE・下書き取得・不要APIのGET権限があれば重大です。公開専用・API単位・GETのみのキーへ分離するか、Netlify Functions経由で秘匿してください。microCMSもCSRではキーが判別可能になると明記しています。[microCMS公式](https://document.microcms.io/content-api/x-microcms-api-key)

- [src/components/ContactForm/Step1Input.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/ContactForm/Step1Input.tsx:45) テキスト入力・select・textareaの`label`に`htmlFor`がなく、フォーム全体も`<form>`ではありません。エラーも`aria-describedby`や`role="alert"`で関連付けられていません。各入力へ一意な`id`、label関連付け、fieldset/legend、autocomplete、実際のsubmit処理、エラー通知を追加してください。これは問い合わせという主要導線の操作性に直結します。[アクセシビリティ基準](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)

## 優先度：中

- [src/components/ServiceHeroFinalV4.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/ServiceHeroFinalV4.tsx:5) 世代番号を含む命名が残り、[Hero.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/Hero.tsx:5)と構造・パララックス・スクロールUIがほぼ重複しています。共通`PageHero`へ抽出し、利用側は`ServiceHero`等の役割名にしてください。

- [src/components/](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components) レイアウト、ホーム専用セクション、CMSカード、IR Voiceページ部品、フォームが同階層です。`components/layout`、`components/ui`、`features/news`、`features/blog`、`features/contact`、`features/ir-voice`のように機能単位へ寄せ、`pages`はルート構成とSEOだけを担当させるのが適切です。

- [src/pages/BlogDetail.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/pages/BlogDetail.tsx:11) News/Blogの一覧・詳細、ローディング、エラー、ページネーション、CMS取得処理が重複しています。共通CMS取得フック、`ArticleDetailLayout`、`Pagination`を用意してください。

- [src/components/ui/](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/ui) 48ファイル中、実行経路に到達するのは`accordion.tsx`と`utils.ts`のみで、46ファイルが未使用です。[ImageWithFallback.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/figma/ImageWithFallback.tsx)、[tashiroArticles.ts](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/data/tashiroArticles.ts)、[globals.css](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/styles/globals.css)も未到達です。利用予定を確認後、不要なshadcnファイルと対応依存を削除してください。

- [package.json](/Users/ishiharayuuta/UsKikaku-Officialsite-1/package.json) 未使用shadcnに対応する多数のRadix、Recharts、cmdk、Vaul等が直接依存として残っています。現在のバンドルには概ね入りませんが、インストール時間・更新作業・サプライチェーン面を悪化させます。参照グラフに基づき削除し、`@types/*`はdevDependenciesへ移してください。

- [src/index.css](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/index.css:1) Tailwind 4.1.3の生成済みCSSが2,662行コミットされていますが、Tailwind本体・設定・ビルド処理がありません。新しいutility classが自動生成されず、手動追記が必要な壊れやすい状態です。

- [src/components/ContactForm/styles.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/ContactForm/styles.tsx:2) CSSファイル、Tailwind風utility、inline style、実行時`<style>`、大量の`!important`が混在しています。既存JSXがutility中心なので、実際のTailwindビルドを導入し、デザイントークンを1か所へ集約する方針が最も移行しやすいです。複雑なIR Voice等だけCSS Modulesを許可し、runtime styleと`!important`を廃止してください。

- [vite.config.ts](/Users/ishiharayuuta/UsKikaku-Officialsite-1/vite.config.ts:9) Figma由来の`package@version` importを解決するため多数のaliasがあります。Vite以外の型検査・Lintでは解決しにくく、ソース表記と実インストール版も一致しません。通常のパッケージ名へ正規化し、不要aliasを削除してください。

- [src/pages/NewsList.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/pages/NewsList.tsx:36) CMSエラーを空配列へ変換するため、「記事が0件」と「通信障害」が区別できません。再試行、ユーザー向け障害表示、タイムアウト、レスポンス検証、監視通知を共通データ層へ追加してください。[BlogList.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/pages/BlogList.tsx:40)等にはキャンセル処理もなく、連続ページ操作で古いレスポンスが後勝ちする可能性があります。

- [src/lib/tashiro.ts](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/lib/tashiro.ts:36) 全記事を100件単位で取得していますが、プロフィールページは取得後に3件へsliceしています。トップ3件用途では各APIから少数件だけ取得し、一覧もサーバー側ページング／キャッシュを検討してください。

- [src/App.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/App.tsx:30) Error Boundaryがなく、描画時例外でSPA全体が白画面になります。ルートとCMS記事領域に境界を設け、再読み込み・トップへ戻る導線とエラー通知を用意してください。

- [src/components/Navbar.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/Navbar.tsx:53) ロゴが`div onClick`でキーボード操作不能です。[Hero.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/Hero.tsx:69)とServiceHeroのScroll導線も同様です。Linkまたはbuttonへ変更し、`main`へのスキップリンクも追加してください。

- [src/components/PrivacyModal.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/PrivacyModal.tsx:14) モーダルにフォーカストラップ、初期フォーカス、Escape操作、元要素へのフォーカス復帰、`aria-labelledby`、背景のinert化がありません。既に依存しているRadix Dialog等へ置き換えると一括して改善できます。TermsModalも同様です。

- [src/index.css](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/index.css:1937) グローバルなshine・scroll-line・smooth scrollや多数のMotionアニメーションに`prefers-reduced-motion`対応がありません。IR Voiceの一部だけでなく、サイト全体に縮小モーション方針を適用してください。

- [src/pages/Company.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/pages/Company.tsx:7) ページ内に`h1`がなく、CompanyProfile以下の`h2`から始まります。CompanyProfileの会社情報もdivの連続です。ページタイトルを`h1`にし、会社情報は`dl`またはtableで表現してください。

- [src/assets/home-hero.jpg](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/assets/home-hero.jpg) 実利用画像は2400×1600、651.74 kBで、ホームの背景とコンテンツ画像に使われます。AVIF/WebP、画面幅別画像、ヒーローのpreload/fetchpriorityを導入してください。多くの`img`にもwidth/heightがなく、CLS対策が不十分です。

- [src/App.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/App.tsx:3) ページ分割は実装済みですが、初期JSは336.41 kB、gzip 110.54 kBでした。常時importされる長大なPrivacy/TermsモーダルとMotionを開いた時だけ読み込み、Motionの`LazyMotion`またはCSS置換を検討してください。

- [netlify.toml](/Users/ishiharayuuta/UsKikaku-Officialsite-1/netlify.toml:1) CSP、`X-Content-Type-Options`、`Referrer-Policy`、`Permissions-Policy`等のレスポンスヘッダーが未設定です。microCMS・EmailJS・reCAPTCHA・Google Maps・Google Fontsを許可した最小CSPをNetlify headersで定義してください。

- [src/components/ContactForm/useContactSubmit.ts](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/ContactForm/useContactSubmit.ts:85) reCAPTCHAトークンの渡し方はEmailJS仕様どおりですが、実際の検証にはEmailJSテンプレート側でreCAPTCHA V2を有効化しsecretを設定する必要があります。リポジトリから確認できないため、運用チェックリストと失敗E2Eテストを用意してください。[EmailJS公式](https://www.emailjs.com/docs/user-guide/adding-captcha-verification/)

- [package-lock.json](/Users/ishiharayuuta/UsKikaku-Officialsite-1/package-lock.json) DOMPurify 3.4.2は複数の後発セキュリティ修正より古い版です。現在のコードは報告された`IN_PLACE`／hook条件を使っていませんが、CMS HTMLの防御境界なので3.4.13以降へ更新してください。[GitHub Advisory](https://github.com/advisories/GHSA-55q2-fjhq-7xh7)

- [src/components/PrivacyModal.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/components/PrivacyModal.tsx:46) プライバシーポリシーと利用規約が「OKKAKE」を対象にしている一方、現行プロダクトページは「IR Voice」です。単なる旧名称か別サービスかを確認し、法務文書の対象サービス・外部送信先を現状へ合わせてください。

## 優先度：低

- [src/assets/tashiro-profile.png](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/assets/tashiro-profile.png) 未使用の14 MB PNGを含め、未使用src画像が約16 MBあります。`public/ogp-image.jpg`等も未使用ですがpublic配下なので毎回distへコピーされます。不要ファイルを削除してください。

- [public/favicon.png](/Users/ishiharayuuta/UsKikaku-Officialsite-1/public/favicon.png) 拡張子と宣言はPNGですが、実体は1024×1024のJPEGです。`ogp-image.jpg`は逆にPNG実体です。正しい形式へ変換し、faviconは複数サイズまたはSVGを用意してください。

- [src/pages/BlogList.tsx](/Users/ishiharayuuta/UsKikaku-Officialsite-1/src/pages/BlogList.tsx:175) News・Blog・田代記事でページネーション実装が別々で、Blog/Newsは現在ページの`aria-current`やURL同期がありません。共通化し、`?page=`へ状態を反映してください。

- [vite.config.ts](/Users/ishiharayuuta/UsKikaku-Officialsite-1/vite.config.ts:53) `build.target: "esnext"`は企業ユーザーの古いブラウザに対する互換性を狭めます。対応ブラウザを定義し、Vite既定targetまたはBrowserslist相当へ合わせてください。

- [package.json](/Users/ishiharayuuta/UsKikaku-Officialsite-1/package.json) scriptが`dev`と`build`のみで、TypeScript型検査・Lint・テスト・アクセシビリティ検査がありません。Viteビルドは型検査をしないため、`tsc --noEmit`、ESLint、Vitest、Playwright/axeをCIに追加してください。

- [package-lock.json](/Users/ishiharayuuta/UsKikaku-Officialsite-1/package-lock.json) Vite 6.3.5にはネットワーク公開した開発／previewサーバーに関する低重要度の既知問題があり、6.3.6で修正されています。本番のNetlify静的配信には直接影響しませんが更新対象です。[GitHub Advisory](https://github.com/vitejs/vite/security/advisories/GHSA-jqfw-vq24-v9c3)

## 総評

ルート単位の`React.lazy`、CMS HTMLへのDOMPurify、開発モックを本番で無効化する設計、田代記事APIの`Promise.allSettled`など、個別には良い改善が入っています。一方で、Figma生成物を土台に局所修正を重ねた結果、生成済みTailwind CSS、個別CSS、inline style、shadcn残骸が同居し、変更時の影響範囲を予測しにくい状態です。

特に先に対処すべきなのは、SEOが重要な企業・記事サイトであるのにCSRのみでメタ情報を生成している点、公開されるmicroCMSキーの権限をコードから保証できない点、問い合わせフォームのアクセシビリティです。

なお、`npm audit`はnpmレジストリへのDNS接続失敗で完走できなかったため、依存関係全体の脆弱性ゼロは保証できません。主要な固定バージョンは公開アドバイザリで補完確認しています。

## 推奨着手順序

1. microCMSキー権限を監査・ローテーションし、SSG／プリレンダリング、共通SEO、実404、CMS連動サイトマップを整備する。
2. 問い合わせフォーム、ナビゲーション、モーダル、縮小モーションをアクセシブルにする。
3. 未使用UI・依存・画像を削除し、機能単位ディレクトリへ再配置する。
4. Tailwindの正規ビルド＋デザイントークン＋限定的CSS Modulesへスタイルを統一する。
5. 共通CMSデータ層、エラー境界、キャッシュ／キャンセル／再試行と、型検査・Lint・テストCIを導入する。
