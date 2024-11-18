# Use the official Node.js Alpine image as the base image
FROM node:20-alpine AS build-env

# Add the rest of the application code
ADD . /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
RUN npm install

# Build your application (if necessary)
RUN npm run build

# Remove unnecessary packages for production
RUN npm prune --production

# Use the distroless Node.js image as the base image
FROM gcr.io/distroless/nodejs20-debian12

# Copy the built application from the build stage
COPY --from=build-env /usr/src/app /app

# Set the working directory
WORKDIR /app

# Expose the application port
EXPOSE 8080

# Command to run your application
CMD ["dist/server.js"]