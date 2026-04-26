# Stage 1: Build stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install all dependencies (including devDependencies needed for building)
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN yarn build

# Stage 2: Production stage
FROM node:22-alpine

# Set environment to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Copy the compiled output from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
