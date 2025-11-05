FROM node:22-slim AS frontend-build
WORKDIR /app
COPY client .
RUN npm install && npm run build

# Step 2: Build Backend (Spring Boot with Gradle) on a Slim JDK
FROM eclipse-temurin:21-noble AS backend-build
WORKDIR /app
COPY server .
RUN chmod +x gradlew 
RUN ./gradlew bootJar

# Step 3: Create Final Container (Merge FE + BE)
FROM eclipse-temurin:21-jre-noble
WORKDIR /app
COPY --from=backend-build /app/build/libs/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "/app/app.jar"]