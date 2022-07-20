ARG APP_PATH_DEFAULT=/usr/src/app

FROM node:17.6.0-alpine3.15 AS builder

ARG APP_PATH_DEFAULT

ENV APP_PATH ${APP_PATH_DEFAULT}

RUN mkdir -p ${APP_PATH}

WORKDIR ${APP_PATH}

COPY package* ${APP_PATH}/
RUN npm install 

COPY docs ${APP_PATH}/docs
COPY openapi ${APP_PATH}/openapi
COPY public ${APP_PATH}/public

RUN npm run build


FROM nginx:1.21.6-alpine

ARG APP_PATH_DEFAULT

COPY --from=builder ${APP_PATH_DEFAULT}/redoc-static.html /usr/share/nginx/html/docs/index.html
COPY --from=builder ${APP_PATH_DEFAULT}/public/favicon.ico /usr/share/nginx/html/docs
