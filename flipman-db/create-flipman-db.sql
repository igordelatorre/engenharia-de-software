CREATE TABLE players(
    id SERIAL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    card int NOT NULL,
    tokens int NOT NULL DEFAULT 0,
    tickets int NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,   
    cellphone char(11)
);

CREATE TABLE machines(
    id SERIAL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    play_cost int NOT NULL DEFAULT 0,
    points_per_ticket int NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true   
);

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    player_id int NOT NULL,
    machine_id int NOT NULL, 
    points int NOT NULL,
    play_time int NOT NULL,
    datetime timestamp NOT NULL, 
    CONSTRAINT fk_player FOREIGN KEY (player_id) REFERENCES players(id),
    CONSTRAINT fk_machine FOREIGN KEY (machine_id) REFERENCES machines(id)
);

CREATE TABLE prizes(
    id SERIAL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    amount int NOT NULL DEFAULT 0,
    price int NOT NULL DEFAULT 0
);

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    player_id int NOT NULL,
    prize_id int NOT NULL,
    datetime timestamp NOT NULL,
    quantity int NOT NULL, 
    CONSTRAINT fk_player FOREIGN KEY (player_id) REFERENCES players(id),
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

CREATE TABLE tokens_transactions(
    id SERIAL PRIMARY KEY,
    player_id int NOT NULL,
    employee_id int NOT NULL,
    datetime timestamp NOT NULL,
    quantity int NOT NULL, 
    CONSTRAINT fk_player FOREIGN KEY (player_id) REFERENCES players(id),
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE management_types(
    id SERIAL, 
    type varchar(255) NOT NULL PRIMARY KEY
);

INSERT INTO management_types(type)
VALUES ('CREATE');

INSERT INTO management_types(type)
VALUES ('UPDATE');

INSERT INTO management_types(type)
VALUES ('DELETE');

CREATE TABLE machine_events(
    id SERIAL PRIMARY KEY,
    manager_id int NOT NULL,
    machine_id int NOT NULL,
    event_type varchar(255) NOT NULL,
    datetime timestamp NOT NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id),
    CONSTRAINT fk_machine FOREIGN KEY (machine_id) REFERENCES machines(id),
    CONSTRAINT fk_management_event FOREIGN KEY (event_type) REFERENCES management_types(type)
);

CREATE TABLE prize_events(
    id SERIAL PRIMARY KEY,
    manager_id int NOT NULL,
    prize_id int NOT NULL,
    datetime timestamp NOT NULL,
    event_type varchar(255) NOT NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id),
    CONSTRAINT fk_prize FOREIGN KEY (prize_id) REFERENCES prizes(id),
    CONSTRAINT fk_management_event FOREIGN KEY (event_type) REFERENCES management_types(type)
);

-- Add admin
INSERT INTO employees(username, password_hash, password_salt, name, is_admin)
VALUES(
    'admin',
    b'\xaa\x15\x8b\xd7\xc5\x15\xdc<\x7f\xc7a<\xbd\xec\xe2C0\x86C\xce\xe0G\xb3\xc6\xffFR\x1a&\x89Aa\xcd\x00\xfan\x1b/L\x12ie\xa8=\x97\x87\x7f<\xab\xac\xda(;k\xd9H0v1\xce\xaf\xfe31',
    b'\x1f\xd1\xeew\xbfr\xd2\x10l\x9b\xac\xd3\xb7\xb8\x19.\x81\xd1ey\xa11"1\x1fN"9\xeaT\x10\x82\xd1-\x84\x96g\xd3\x1b\xfa\x13\x813=\xbatYcJ\x869\xffjX(\xbe\xa6"\x15\xee|;\xc8\xc5\xe2\xbf\xec@\xcfu\xd6\xcb\x1e\xc6\x13"&:p\xc7\xef\xab\t\xafvF6&\xb1\x0c\x9b\x92\x94\x01\x86\xa3\xbc\x08\x9b\xffWH\xa7\xa8\xf0\xdb\r]\xd91|\xf2Q\xe2,\x08\x12\xe6/\xc8\xaf$O\xbf\x99\xf7\xbf\x14',
    'adm',
    True
)