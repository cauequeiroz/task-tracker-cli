CREATE TABLE status (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE task (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    description VARCHAR(255) NOT NULL,
    status_id INTEGER REFERENCES status(id),
    createdAt VARCHAR(100),
    updatedAt VARCHAR(100)
);

INSERT INTO status (name) VALUES ('todo'), ('in-progress'), ('done');