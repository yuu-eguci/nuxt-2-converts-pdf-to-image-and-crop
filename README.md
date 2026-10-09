nuxt-2-converts-pdf-to-image-and-crop
===

PDF を画像にして、好きな範囲を切り抜くやつ。

- Docker: 対応!
- Node.js: 22!
- Linter: ESLint 8 (@nuxtjs/eslint-config)!
- Test: Jest 29 (+ @vue/test-utils 1)!
- Nuxt: 2.17 / Vue: 2.7 / Vuetify: 2.7 / pdfjs-dist: 2.5.207

## パッと実行してみたい

```bash
docker compose up --build
```

`http://localhost:3000` を開いて PDF を選ぶか、ドラッグ&ドロップ。
全ページが縦に並んだ画像になる。ドラッグで範囲を選ぶと、切り抜いた画像が下に出る。

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
```

赤と青の2ページ PDF を作って、画像化と切り抜きを確認する。成功すると `OK` が出る。

pdfjs の既知の脆弱性 (CVE-2024-4367) には `isEvalSupported: false` の回避設定を入れてある。
Nuxt 2・Vue 2・pdfjs 2 は古いままなので、新しい版への移行はまだ課題。

![](./docs/readme-drag-and-drop-pdf.png)

![](./docs/readme-rectangular-selection-and-crop-image.png)

```bash
yarn dev
```
