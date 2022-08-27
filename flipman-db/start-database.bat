docker build -t flipman/db --file flipman-db.Dockerfile .

docker run --name=postgres --restart=always -p 5432:5432 -d flipman/db
