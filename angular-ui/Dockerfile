ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.18

FROM --platform=$TARGETPLATFORM artifactory.cloud.cms.gov/docker/library/node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder

ARG NODE_VERSION
ENV NODE_VERSION=${NODE_VERSION}

ARG ALPINE_VERSION
ENV ALPINE_VERSION=${ALPINE_VERSION}

ARG TARGETPLATFORM
ENV TARGETPLATFORM=${TARGETPLATFORM}

# `docker build --build-arg ARG1="some ARG1 override" --build-arg ARG2="some ARG2 override"`
ARG ARG1
ENV ARG1=${ARG1:-"default ARG1"}
ARG ARG2
ENV ARG2=${ARG2:-"default ARG2"}

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
RUN npm run build


FROM --platform=$TARGETPLATFORM artifactory.cloud.cms.gov/docker/library/node:${NODE_VERSION}-alpine${ALPINE_VERSION}

ARG NODE_VERSION
ENV NODE_VERSION=${NODE_VERSION}

ARG ALPINE_VERSION
ENV ALPINE_VERSION=${ALPINE_VERSION}

ARG TARGETPLATFORM
ENV TARGETPLATFORM=${TARGETPLATFORM}

# `docker build --build-arg ARG1="some ARG1 override" --build-arg ARG2="some ARG2 override"`
ARG ARG1
ENV ARG1=${ARG1:-"default ARG1"}
ARG ARG2
ENV ARG2=${ARG2:-"default ARG2"}

WORKDIR /app

USER node

COPY --chown=node:node --from=build /app /app

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
