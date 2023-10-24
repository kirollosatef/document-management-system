# ./server/Dockerfile

# Specify the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy local code to the container's workspace
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Run the app
CMD ["node", "app.js"]
