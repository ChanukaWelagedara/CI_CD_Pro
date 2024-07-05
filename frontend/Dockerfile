# Use the official Node.js image as the base image
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a smaller base image for the final image
FROM node:14-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/build ./build

# Install serve globally to serve the production build
RUN npm install -g serve

# Expose the port serve runs on
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build"]
