FROM node:18.14.0-buster-slim

USER root
WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3333