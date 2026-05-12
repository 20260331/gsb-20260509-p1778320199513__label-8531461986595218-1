# Build stage
FROM public.ecr.aws/docker/library/node:18-alpine AS builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

# Production stage
FROM public.ecr.aws/docker/library/nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
