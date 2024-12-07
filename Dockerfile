# Use the Node.js 20 Alpine base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json for caching
COPY ./src/package.json ./src/package-lock.json ./

# Install dependencies using npm ci
RUN npm ci

# Copy the rest of the application files
COPY ./src .

# Expose port (if applicable)
# EXPOSE 3000


# Command to start the application
CMD ["npm", "run", "dev"]

# Guide run image
# 1. Build the Docker Image
# Use the docker build command to create a Docker image from your Dockerfile.
# docker build -t mreys-net .
#  -t my-node-app: Tags the image with the name my-node-app.
#  .: Specifies the current directory as the build context (where your Dockerfile is located).

# 2. Run the Container
# After building the image, you can run it using the docker run command.
# docker run -p 3000:3000 mreys-net
