#!/bin/bash

# pagomnini-app Docker 컨테이너를 중지, 삭제, 재빌드 후 실행합니다.

echo "pagomnini-app 배포 스크립트를 시작합니다..."

echo "깃에서 최신 버전을 불러옵니다..."
git pull

# 1. 기존에 동일한 이름의 컨테이너가 있다면 중지하고 삭제합니다.
if [ $(docker ps -a -q -f name=pagomnini) ]; then
    echo "기존 'pagomnini' 컨테이너를 중지하고 삭제합니다."
    docker stop pagomnini
    docker rm pagomnini
fi

# 2. 기존에 동일한 이름의 이미지가 있다면 삭제합니다.
if [ $(docker images -q pagomnini-app) ]; then
    echo "기존 'pagomnini-app' 이미지를 삭제합니다."
    docker rmi pagomnini-app
fi

# 3. Dockerfile을 사용하여 이미지를 다시 빌드합니다.
# 현재 디렉토리(.)의 Dockerfile을 사용합니다.
echo "'pagomnini-app' 이미지를 새로 빌드합니다..."
docker build -t pagomnini-app .

# 4. 새 이미지로 Docker 컨테이너를 실행합니다.
echo "pagomnini-app 컨테이너를 시작합니다..."
docker run -d --env-file .env -p 3000:3000 --name pagomnini pagomnini-app

echo "pagomnini-app 배포가 성공적으로 완료되었습니다."
