FROM golang:1.21-alpine as build

WORKDIR /app

COPY go.mod ./

RUN apk add git && \
    go mod download

COPY . ./

RUN go build -o /app/bin/kl-go-server .

FROM golang:1.21-alpine

WORKDIR /app

COPY --from=build /app/bin/kl-go-server .

RUN adduser -S -D -H -h /app appuser && \
    chown -R appuser /app && \
    chmod +x /app/kl-go-server

USER appuser

EXPOSE 3000

CMD [ "/app/kl-go-server" ]
