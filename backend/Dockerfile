FROM node
WORKDIR /var/www/
COPY package.json package-lock.json ./
RUN npm i
COPY . /var/www/
RUN npm run build
EXPOSE 3000
ENTRYPOINT npm run start


