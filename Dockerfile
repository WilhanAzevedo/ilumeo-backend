FROM node:18.14.0-buster-slim

USER root
WORKDIR /app

COPY . /app

RUN npm install && apt-get update -y && apt-get install -y openssl



EXPOSE 3333

CMD ["npx prisma generate && npx prisma db push"]

