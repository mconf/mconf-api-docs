FROM node:15.4.0-slim

WORKDIR /app

ADD package.json package-lock.json /app/

RUN npm install \
 && npm cache clear --force

ADD . /app

EXPOSE 3000

CMD ["node", "src/index.js"]
