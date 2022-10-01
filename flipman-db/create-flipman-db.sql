CREATE TABLE players(
    card int PRIMARY KEY,
    name varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    tokens int NOT NULL DEFAULT 0,
    tickets int NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,   
    cellphone char(11)
);

CREATE TABLE machines(
    id SERIAL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    play_cost int NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true   
);

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    player_card int NOT NULL,
    machine_id int NOT NULL, 
    tickets int NOT NULL,
    play_time int NOT NULL,
    datetime timestamp NOT NULL, 
    CONSTRAINT fk_player FOREIGN KEY (player_card) REFERENCES players(card),
    CONSTRAINT fk_machine FOREIGN KEY (machine_id) REFERENCES machines(id)
);

CREATE TABLE prizes(
    id SERIAL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    amount int NOT NULL DEFAULT 0,
    price int NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE prizes_transactions(
    id SERIAL PRIMARY KEY,
    player_card int NOT NULL,
    prize_id int NOT NULL,
    datetime timestamp NOT NULL,
    quantity int NOT NULL,
    CONSTRAINT fk_player FOREIGN KEY (player_card) REFERENCES players(card),
    CONSTRAINT fk_prize FOREIGN KEY (prize_id) REFERENCES prizes(id)
);

CREATE TABLE employees(
    id SERIAL PRIMARY KEY, 
    username varchar(255) NOT NULL,
    password_hash bytea NOT NULL,
    password_salt bytea NOT NULL,
    name varchar(255) NOT NULL,
    is_admin boolean NOT NULL DEFAULT false
);
