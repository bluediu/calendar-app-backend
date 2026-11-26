# syntax=docker/dockerfile:1
ARG NODE_VERSION=26.13.1

# ------------------------------------------------------------
# base: imagen común
# ------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine3.24 AS base
# Node 26 en Linux necesita libatomic
RUN apk add --no-cache libatomic \
    && npm install -g yarn@1.22.22
WORKDIR /app

# ------------------------------------------------------------
# deps: TODAS las dependencias (dev + prod), cacheadas por capa
# ------------------------------------------------------------
FROM base AS deps
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile

# ------------------------------------------------------------
# dev: desarrollo con recarga (tsx watch)
# ------------------------------------------------------------
FROM deps AS dev
ENV NODE_ENV=development
COPY . .
EXPOSE 8080
CMD ["yarn", "dev"]

# ------------------------------------------------------------
# build: compila TypeScript -> dist/
# ------------------------------------------------------------
FROM deps AS build
COPY tsconfig.json ./
COPY src ./src
RUN yarn build

# ------------------------------------------------------------
# prod-deps: solo dependencias de producción
# ------------------------------------------------------------
FROM base AS prod-deps
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --production

# ------------------------------------------------------------
# prod: imagen final, ligera y sin root
# ------------------------------------------------------------
FROM base AS prod
ENV NODE_ENV=production
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./
USER node
EXPOSE 8080
CMD ["node", "dist/app.js"]