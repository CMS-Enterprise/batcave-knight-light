FROM golang:1.22-alpine AS build

WORKDIR /app

COPY go.mod ./

RUN apk add git && \
    go mod download

COPY . ./

RUN go build -o /app/bin/ ./...


FROM alpine:latest


ENV KNIGHT_LIGHT_PORT=8080

RUN addgroup -g 1000 app && \
    adduser -D -u 1000 -G app app

WORKDIR /app

COPY --from=build /app/bin/go-server .

EXPOSE 8080

RUN chown -R myuser:mygroup /app

USER app

CMD [ "/app/go-server" ]
