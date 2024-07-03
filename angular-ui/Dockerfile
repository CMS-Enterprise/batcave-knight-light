FROM node:alpine AS build

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
RUN npm run build


FROM node:alpine

WORKDIR /app
COPY --from=build /app /app

EXPOSE 4200
EXPOSE 8888

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
