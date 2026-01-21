ARG APP_PATH_DEFAULT=/opt/docusaurus

FROM node:lts-alpine AS base
ENV FORCE_COLOR=0
RUN corepack enable
WORKDIR /opt/docusaurus

FROM base AS dev
WORKDIR /opt/docusaurus
COPY . .
EXPOSE 3000
CMD [ -d "node_modules" ] && npm start -- --poll 1000 --host 0.0.0.0 || npm install && npm start -- --poll 1000 --host 0.0.0.0

FROM base AS builder

WORKDIR ${APP_PATH}

ARG SHOW_INTERNAL_APIS
ARG SITE_URL
ARG THEME
ENV SHOW_INTERNAL_APIS=$SHOW_INTERNAL_APIS
ENV SITE_URL=$SITE_URL
ENV THEME=$THEME

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.29.4-alpine AS prod

ARG APP_PATH_DEFAULT

COPY --from=builder ${APP_PATH_DEFAULT}/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder ${APP_PATH_DEFAULT}/build /usr/share/nginx/html/docs
COPY --from=builder ${APP_PATH_DEFAULT}/static/img/favicon.svg /usr/share/nginx/html/docs
COPY --from=builder ${APP_PATH_DEFAULT}/redirect/index.html /usr/share/nginx/html/index.html

FROM nginx:1.29.4-alpine AS confweb

ARG APP_PATH_DEFAULT

COPY --from=builder ${APP_PATH_DEFAULT}/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder ${APP_PATH_DEFAULT}/build /usr/share/nginx/html/docs
COPY --from=builder ${APP_PATH_DEFAULT}/static/img/favicon.svg /usr/share/nginx/html/docs
COPY --from=builder ${APP_PATH_DEFAULT}/redirect/index.html /usr/share/nginx/html/index.html
