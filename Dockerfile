# Step 1: Build Frontend (Vite React) with Slim Node.js 20
FROM node:20-slim AS frontend-build
WORKDIR /app
COPY client .
RUN npm install && npm run build
ls -l /app/server/src/main/resources/static
ls -l /app

# Step 2: Build Backend (Spring Boot with Gradle) on a Slim JDK
FROM openjdk:21-slim AS backend-build
WORKDIR /app
COPY server .
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

# Step 3: Create Final Container (Merge FE + BE)
FROM openjdk:21-slim
WORKDIR /app
COPY --from=backend-build /app/build/libs/*.jar app.jar
COPY --from=frontend-build /app/server/src/main/resources/static /static
ENTRYPOINT ["java", "-jar", "/app/app.jar"]