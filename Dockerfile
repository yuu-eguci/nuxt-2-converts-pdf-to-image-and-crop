FROM node:22-bookworm AS dev

# vue-jest 経由の deasync をネイティブビルドするため、 python3/g++ を含むフル版を使います。
WORKDIR /app

ENV HOST=0.0.0.0

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-engines && yarn cache clean

COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]

# 本番用: 静的ファイルを生成して nginx で配信します。
FROM dev AS build
RUN yarn generate

FROM nginx:1.30-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
