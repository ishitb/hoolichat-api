FROM node

EXPOSE 3000

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

CMD "npm" "start"