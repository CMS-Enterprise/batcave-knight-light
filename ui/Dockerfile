FROM node:20-alpine

COPY . /app
WORKDIR /app

COPY package.json ./
RUN npm install --silent

EXPOSE 3000:3000

CMD ["npm", "run", "dev"]
# ENTRYPOINT ["/bin/sh"]
