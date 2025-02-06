FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application files
COPY . .

# Expose the port the server runs on
EXPOSE 4000

# Define the environment variables
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]