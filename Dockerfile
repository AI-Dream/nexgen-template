# Dockerfile
FROM node:20.9.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nexgen-frontend
WORKDIR /usr/src/nexgen-frontend

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nexgen-frontend/
RUN npm install
RUN npm run build

EXPOSE 5555

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5555

CMD [ "npm", "start"]

