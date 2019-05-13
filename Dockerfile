FROM node:10-alpine
RUN apk add --update \
    python \
    make \
    g++

# 앱 디렉토리 생성
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 추가
COPY . .

EXPOSE 3006
CMD [ "npm", "start" ]

