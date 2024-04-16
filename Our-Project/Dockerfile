FROM node
WORKDIR /var/www
COPY package.json package-lock.json ./
RUN npm i
COPY . /var/www/
RUN npm run build
EXPOSE 4173
ENTRYPOINT npm run preview