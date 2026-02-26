FROM eclipse-temurin:21-noble AS build

WORKDIR /app

COPY . .

RUN chmod +x gradlew

RUN ./gradlew bootJar

FROM eclipse-temurin:21-jre-noble

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
