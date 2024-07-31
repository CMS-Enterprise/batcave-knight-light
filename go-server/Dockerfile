FROM golang:1.22-alpine AS build

WORKDIR /app

COPY go.mod ./

RUN apk add git && \
    go mod download

COPY . ./

RUN go build -o /app/bin/ ./...


FROM alpine:latest

ENV KNIGHT_LIGHT_PORT=8080

WORKDIR /app

COPY --from=build /app/bin/go-server .

RUN echo 'X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*' > test-test-av-file.txt
# RUN echo 'foobar' > test-test-av-file.txt

EXPOSE 8080

CMD [ "/app/go-server" ]
