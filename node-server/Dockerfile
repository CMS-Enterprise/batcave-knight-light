FROM alpine:3.19
WORKDIR /app
COPY . /app/
EXPOSE 3000

RUN apk update && apk add npm
RUN npm install express

CMD ["node", "index.js"]