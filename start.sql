CREATE TABLE status (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) UNIQUE NOT NULL,
    readable_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE task (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    description VARCHAR(255) NOT NULL,
    status_id INTEGER REFERENCES status(id),
    created_at VARCHAR(100),
    updated_at VARCHAR(100)
);

INSERT INTO status
    (name, readable_name)
VALUES
    ('todo', 'To Do'), ('in-progress', 'In Progress'), ('done', 'Done');