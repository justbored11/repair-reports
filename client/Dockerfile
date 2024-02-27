# syntax=docker/dockerfile:1
#default port 5273 

FROM node:21-alpine3.18
WORKDIR /app
COPY . .
RUN npm install --production
RUN npm run build
CMD ["npm", "run", "preview"]
EXPOSE 5273