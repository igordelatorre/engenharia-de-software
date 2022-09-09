CREATE TABLE players(
    id SERIAL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    card int NOT NULL,
    tokens int NOT NULL DEFAULT 0,
    tickets int NOT NULL DEFAULT 0,
    isActive boolean NOT NULL DEFAULT true,   
    cellphone char(11)
);

CREATE TABLE machines(
    id SERIAL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    playCost int NOT NULL DEFAULT 0,
    pointsPerTicket int NOT NULL DEFAULT 0,
    isActive boolean NOT NULL DEFAULT true   
);

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    playerId int NOT NULL,
    machineId int NOT NULL, 
    points int NOT NULL,
    playTime int NOT NULL,
    datetime timestamp NOT NULL, 
    CONSTRAINT fk_player FOREIGN KEY (playerId) REFERENCES players(id),
    CONSTRAINT fk_machine FOREIGN KEY (machineId) REFERENCES machines(id)
);

CREATE TABLE prizes(
    id SERIAL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    amount int NOT NULL DEFAULT 0,
    price int NOT NULL DEFAULT 0
);

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    playerId int NOT NULL,
    prizeId int NOT NULL,
    datetime timestamp NOT NULL,
    quantity int NOT NULL, 
    CONSTRAINT fk_player FOREIGN KEY (playerId) REFERENCES players(id),
    CONSTRAINT fk_prize FOREIGN KEY (prizeId) REFERENCES prizes(id)
);

CREATE TABLE employees(
    id SERIAL PRIMARY KEY, 
    username varchar(255) NOT NULL,
    passwordhash bytea NOT NULL,
    passwordsalt bytea NOT NULL,
    name varchar(255) NOT NULL,
    isAdmin boolean NOT NULL DEFAULT false
);

CREATE TABLE tokensTransactions(
    id SERIAL PRIMARY KEY,
    playerId int NOT NULL,
    employeeId int NOT NULL,
    datetime timestamp NOT NULL,
    quantity int NOT NULL, 
    CONSTRAINT fk_player FOREIGN KEY (playerId) REFERENCES players(id),
    CONSTRAINT fk_employee FOREIGN KEY (employeeId) REFERENCES employees(id)
);

CREATE TABLE managementTypes(
    id SERIAL, 
    type varchar(255) NOT NULL PRIMARY KEY
);

INSERT INTO managementTypes(type)
VALUES ('CREATE');

INSERT INTO managementTypes(type)
VALUES ('UPDATE');

INSERT INTO managementTypes(type)
VALUES ('DELETE');

CREATE TABLE machineEvents(
    id SERIAL PRIMARY KEY,
    managerId int NOT NULL,
    machineId int NOT NULL,
    eventType varchar(255) NOT NULL,
    datetime timestamp NOT NULL,
    CONSTRAINT fk_manager FOREIGN KEY (managerId) REFERENCES employees(id),
    CONSTRAINT fk_machine FOREIGN KEY (machineId) REFERENCES machines(id),
    CONSTRAINT fk_management_event FOREIGN KEY (eventType) REFERENCES managementTypes(type)
);

CREATE TABLE prizeEvents(
    id SERIAL PRIMARY KEY,
    managerId int NOT NULL,
    prizeId int NOT NULL,
    datetime timestamp NOT NULL,
    eventType varchar(255) NOT NULL,
    CONSTRAINT fk_manager FOREIGN KEY (managerId) REFERENCES employees(id),
    CONSTRAINT fk_prize FOREIGN KEY (prizeId) REFERENCES prizes(id),
    CONSTRAINT fk_management_event FOREIGN KEY (eventType) REFERENCES managementTypes(type)
);
