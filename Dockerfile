FROM gradle:8.10-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle clean