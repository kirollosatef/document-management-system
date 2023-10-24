# Specify the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# The port on which the client is running
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
