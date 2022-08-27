FROM library/postgres

ENV POSTGRES_USER flipman
ENV POSTGRES_PASSWORD 123456

COPY create-flipman-db.sql /docker-entrypoint-initdb.d/