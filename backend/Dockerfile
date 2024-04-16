FROM node:20.10.0
WORKDIR /var/www/
COPY package.json package-lock.json ./
RUN npm i
RUN npm i bcrypt
COPY . /var/www/
RUN npm run build
EXPOSE 3000
ENTRYPOINT npm run start

