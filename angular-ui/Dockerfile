FROM node:alpine AS build

WORKDIR /app
COPY package*.json angular.json eslint.config.js tsconfig.*.json tsconfig.json /app/
RUN npm ci

COPY src /app/src
RUN npm run build


FROM node:alpine

WORKDIR /app
COPY --from=build /app /app

EXPOSE 4200
EXPOSE 9876

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
