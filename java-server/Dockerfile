FROM maven:3-amazoncorretto-21 AS build
WORKDIR /app
COPY . /app/

RUN mvn clean install

FROM amazoncorretto:21.0.2-alpine3.19

WORKDIR /app

COPY --from=build /app/ .

RUN apk add maven

RUN adduser -S -D -H -h /app appuser && \
    chown -R appuser /app && \
    chmod +x /app/target

USER appuser

EXPOSE 8080

CMD ["mvn", "spring-boot:run"]
