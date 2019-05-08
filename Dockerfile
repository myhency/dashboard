FROM node:6-alpine
RUN apk add --update \
    python \
    make \
    g++
CMD cd /var/jenkins_home/workspace/baas-portal-front-end && npm start
