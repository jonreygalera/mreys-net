# Use the Node.js 20 Alpine base image for the build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ./src/package*.json ./
RUN npm ci

# Copy the rest of the source code and build the app
COPY ./src .
RUN npm run build

# Use the nginx:alpine image for the runtime stage
FROM nginx:alpine

# Install supervisord
RUN apk add --no-cache supervisor

# Copy the built files from the build stage to nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the supervisord configuration file
COPY ./playbook/conf/supervisord/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./playbook/conf/nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the web server
EXPOSE 80

# Start supervisord in the foreground
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# Guide run image
# 1. Build the Docker Image
# Use the docker build command to create a Docker image from your Dockerfile.
# docker build -t mreys-net .
#  -t my-node-app: Tags the image with the name my-node-app.
#  .: Specifies the current directory as the build context (where your Dockerfile is located).

# 2. Run the Container
# After building the image, you can run it using the docker run command.
# docker run -p 3000:3000 mreys-net
