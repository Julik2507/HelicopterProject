FROM node:20
WORKDIR /var/www/
COPY package.json package-lock.json ./
RUN npm i
RUN npm i bcryptjs
COPY . /var/www/
RUN npm run build
EXPOSE 3000
ENTRYPOINT npm run start

