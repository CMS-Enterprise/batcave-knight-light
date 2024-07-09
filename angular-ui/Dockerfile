FROM artifactory.cloud.cms.gov/docker/node:18 AS base

WORKDIR /app
COPY package*.json .
RUN npm ci


FROM base AS build

COPY . .
RUN npm run build


FROM artifactory.cloud.cms.gov/docker/node:18

WORKDIR /app
COPY --from=build /app /app
EXPOSE 4200
EXPOSE 8888
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
