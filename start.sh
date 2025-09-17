#!/bin/bash

# pagomnini-app Docker 컨테이너를 실행합니다.

echo "pagomnini-app 컨테이너를 시작합니다..."

# 기존에 동일한 이름의 컨테이너가 있다면 중지하고 삭제합니다.
if [ $(docker ps -a -q -f name=pagomnini) ]; then
    echo "기존 'pagomnini' 컨테이너를 중지하고 삭제합니다."
    docker stop pagomnini
    docker rm pagomnini
fi

# Docker 컨테이너 실행
docker run -d --env-file .env -p 3000:3000 --name pagomnini pagomnini-app

echo "pagomnini-app 컨테이너가 성공적으로 시작되었습니다."