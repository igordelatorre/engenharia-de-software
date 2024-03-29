#!/bin/bash

# sudo systemctl restart docker.socket docker.service
# sudo ss -lptn 'sport = :5432'
# sudo kill -9 pid

docker build -t flipman/db --file flipman-db.Dockerfile . && \
docker rm -f postgres && \
docker run --name=postgres --restart=always -p 5432:5432 -d flipman/db

# sudo docker run --name=postgres -e POSTGRES_USER=flipman -e POSTGRES_PASSWORD=123456 --restart=always -p 5432:5432 -d postgres
# sudo docker run --name=api --restart=always --net=host -d igordelatorre/flipman
