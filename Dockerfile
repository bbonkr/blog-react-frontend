FROM node:12

LABEL maintainer="Pon Cheol Ku <bbon@bbon.kr>"

# 앱 디렉터리 생성
WORKDIR /app

# 앱 소스 추가
COPY . .

WORKDIR /app/src

#RUN npm ci --only=production
RUN npm i
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
