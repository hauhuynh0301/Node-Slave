# Step 1: Use an official Node.js image as the base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if present) into the working directory
COPY package.json /app/

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . /app/

# Step 6: Expose port 8080 (default port for webpack-dev-server)
EXPOSE 8080

# Step 7: Set the command to start webpack-dev-server
CMD ["npm", "start"]
