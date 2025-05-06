FROM node:18-alpine
WORKDIR /app
COPY backend ./backend
COPY frontend ./frontend
WORKDIR /app/backend
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000
