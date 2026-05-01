# Build stage
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /Backend

# Copy pom and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /Backend

# Copy jar from build stage
COPY --from=build /Backend/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run app
ENTRYPOINT ["java", "-jar", "app.jar"]