FROM node:6-alpine
RUN apk add --update \
    python \
    make \
    g++
CMD npm start
