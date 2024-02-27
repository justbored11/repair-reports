# syntax=docker/dockerfile:1
# default port is 8000

FROM node:21-alpine3.18
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["npm", "run", "start"]
EXPOSE 8000