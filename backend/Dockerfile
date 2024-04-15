FROM node
WORKDIR /var/www/
COPY package.json package-lock.json ./
RUN npm i
RUN npm uninstall bcrypt
RUN npm uninstall bcryptjs
RUN npm i bcrypt
RUN npm i bcryptjs
COPY . /var/www/
RUN npm run build
EXPOSE 3000
ENTRYPOINT npm run start

