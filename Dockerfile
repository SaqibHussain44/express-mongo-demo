FROM node:12.22-slim

WORKDIR /app
COPY . .
RUN npm i 
CMD npm start
EXPOSE 8080
