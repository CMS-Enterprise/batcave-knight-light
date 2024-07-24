FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache npm

# Add a group and user to prevent running the app as root
RUN addgroup -S server && adduser -S server -G server
RUN chown -R server:server /app
USER server

COPY package*.json .

ENV NODE_ENV=production
RUN npm ci

COPY index.js .

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["index.js"]
