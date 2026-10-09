nuxt-2-converts-pdf-to-image-and-crop
===

PDF を画像にして、好きな範囲を切り抜くやつ。

- Docker: 対応!
- Node.js: 22!
- Linter: ESLint 8 (@nuxtjs/eslint-config)!
- Test: Jest 29 + Puppeteer (ブラウザのスモークテスト)!
- Nuxt: 2.17 / Vue: 2.7 / Vuetify: 2.7 / pdfjs-dist: 2.5.207

## パッと実行してみたい

```bash
docker compose up --build
```

`http://localhost:3000` を開いて PDF を選ぶか、ドラッグ&ドロップ。
全ページが幅 500px で縦に並んだ画像になる。
ページ数が多いと、高さ 32767px 以下に収まるよう縮む。
ドラッグで範囲を選ぶと、切り抜いた画像が下に出る。タッチ操作も可。
PDF と画像以外のファイルや、読めないファイルを渡すとエラーメッセージが出る。

静的ファイルを nginx で配信して確かめるならこちら。
`http://localhost:3080` で開ける。

```bash
docker compose --profile prod up --build prod
```

lint とテストも Docker でどうぞ。

```bash
docker compose run --rm app yarn lint
docker compose run --rm app yarn test
```

ブラウザでも確かめたいならこちら。ホスト側に Node.js 22・Yarn・Chrome が必要。

```bash
docker compose up -d
yarn install --frozen-lockfile --ignore-engines
CHROME_PATH="/path/to/chrome" yarn smoke:browser
# 本番の配信を確かめるなら APP_URL=http://localhost:3080/ をつける
```

テスト用の PDF などをその場で作り、画像化・切り抜き・エラー表示をシナリオごとに確認する。全部通ると `OK` が出る。

pdfjs の既知の脆弱性 (CVE-2024-4367) には `isEvalSupported: false` の回避設定を入れてある。
Nuxt 2・Vue 2・pdfjs 2 は古いままなので、新しい版への移行はまだ課題。

![](./docs/readme-drag-and-drop-pdf.png)

![](./docs/readme-rectangular-selection-and-crop-image.png)

```bash
yarn dev
```
