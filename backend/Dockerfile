FROM node
WORKDIR /var/www/
COPY package.json package-lock.json ./
RUN npm i
RUN npm i bcrypt
COPY . /var/www/
RUN npm run build
EXPOSE 80
ENTRYPOINT npm run start

