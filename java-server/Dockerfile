FROM artifactory.cloud.cms.gov/docker/alpine:3.19
WORKDIR /app
COPY . /app/
EXPOSE 8080

RUN apk update
RUN apk add openjdk21
RUN apk add maven

RUN export PATH=${PATH}:${JAVA_HOME}/bin
RUN mvn clean install

CMD ["mvn", "spring-boot:run"]