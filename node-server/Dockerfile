FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache npm

COPY package*.json .

ENV NODE_ENV=production
RUN npm ci

COPY index.js .

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["index.js"]
