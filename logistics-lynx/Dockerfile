# Multi-stage Dockerfile for TMS Software
# Stage 1: Build stage
FROM node:20.14.0-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for build tools
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build:ts
RUN npm run build

# Stage 2: Production stage
FROM node:20.14.0-alpine AS production

# Create app user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy necessary configuration files
COPY --chown=nextjs:nodejs tsconfig*.json ./
COPY --chown=nextjs:nodejs vite.config.ts ./
COPY --chown=nextjs:nodejs tailwind.config.ts ./
COPY --chown=nextjs:nodejs postcss.config.js ./
COPY --chown=nextjs:nodejs components.json ./

# Copy autonomous system and other backend files
COPY --from=builder --chown=nextjs:nodejs /app/autonomous-system ./autonomous-system
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/server ./server
COPY --from=builder --chown=nextjs:nodejs /app/supabase ./supabase

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/monitoring/health-check.js || exit 1

# Default command
CMD ["npm", "run", "preview"]
