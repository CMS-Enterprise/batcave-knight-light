FROM node:alpine AS base

WORKDIR /app
COPY package.json .
RUN npm install


FROM base AS build

COPY . .
RUN npm run build


FROM node:alpine

WORKDIR /app
COPY --from=build /app /app
EXPOSE 4200
EXPOSE 8888
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
