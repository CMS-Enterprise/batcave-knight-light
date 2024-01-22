FROM artifactory.cloud.cms.gov/docker/alpine:3.18.5
WORKDIR /app
COPY . /app/
EXPOSE 3000

RUN apk add --update npm
RUN npm install express

CMD ["node", "index.js"]