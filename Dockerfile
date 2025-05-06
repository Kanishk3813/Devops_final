# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
