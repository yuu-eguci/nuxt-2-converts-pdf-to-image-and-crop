FROM node:22-bookworm

# vue-jest 経由の deasync をネイティブビルドするため、 python3/g++ を含むフル版を使います。
WORKDIR /app

# Nuxt 2 (webpack 4) は Node 17 以降で legacy OpenSSL provider が必要です。
ENV NODE_OPTIONS=--openssl-legacy-provider \
    HOST=0.0.0.0

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-engines && yarn cache clean

COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]
