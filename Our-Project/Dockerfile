# FROM node
# WORKDIR /var/www/
# COPY package.json package-lock.json ./
# RUN npm i
# COPY . /var/www/
# RUN npm run build
# EXPOSE 4173
# ENTRYPOINT npm run preview

FROM node as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

EXPOSE 4173

ENTRYPOINT node build/index.js