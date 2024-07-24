ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.18

FROM --platform=$TARGETPLATFORM artifactory.cloud.cms.gov/docker/library/node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci


FROM builder AS build

COPY . .

RUN npm run build


ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.18

FROM --platform=$TARGETPLATFORM artifactory.cloud.cms.gov/docker/library/node:${NODE_VERSION}-alpine${ALPINE_VERSION}

# `docker build --build-arg ARG1="some ARG1 override" --build-arg ARG2="some ARG2 override"`
ARG ARG1
ENV ARG1=${ARG1:-"default ARG1"}
ARG ARG2
ENV ARG2=${ARG2:-"default ARG2"}

WORKDIR /app

USER node

COPY --chown=node:node --from=build /app /app

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
