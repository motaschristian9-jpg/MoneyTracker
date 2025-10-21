# Stage 1: Build React app
FROM node:20 AS build

WORKDIR /app

# Copy only package files first for caching
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the source code
COPY . .

# Ensure Vite outputs to 'build' folder
RUN npm run build || cat /app/npm-debug.log

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build folder from first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
