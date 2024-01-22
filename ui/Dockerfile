FROM artifactory.cloud.cms.gov/docker/node:20-alpine3.18

COPY . /app
WORKDIR /app

COPY package.json ./
RUN npm install --silent

EXPOSE 3000:3000

CMD ["npm", "run", "dev"]
# ENTRYPOINT ["/bin/sh"]
