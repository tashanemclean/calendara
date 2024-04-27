# Stage 1: Build the React application
FROM node:lts-alpine as build

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .
# # Set some variable... must replace with real values
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" >> .env

# Build the application
RUN npm run build

# stage 2: Serve the React application from Nginx
FROM nginx:stable-alpine

# Copy the React build from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG COMMIT_REF
ENV COMMIT_REF ${COMMIT_REF}

# expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]