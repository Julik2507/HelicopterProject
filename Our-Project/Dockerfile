# FROM node
# WORKDIR /var/www/
# COPY package.json package-lock.json ./
# RUN npm i
# COPY . /var/www/
# RUN npm run build
# EXPOSE 4173
# ENTRYPOINT npm run preview

# copy package.json ./  - скопировать из текущей дериктории package и закинуть в текущую директорию хост-машины
# по идее можно без /, просто .

# copy . .  =скопируй все из текующей дериктории(файлы директории и тп) в . текущую деррикторию хост-машины
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