BEGIN;

DROP TABLE IF EXISTS users, posts, comments, votes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(20) NOT NULL ,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(60) NOT NULL,
    mobile VArCHAR(60) ,
    img_url VARCHAR(255) 
);

INSERT INTO users (name, email, password, role, mobile, img_url) VALUES 
('root','root@gmail.com', '$2y$07$n9j.0an82ZKvkZo593pS0emkpt1VOeIL0vwk2S7hDPnJ8Ji6yexmC','superAdmin', '0599000000', 'https://plus.unsplash.com/premium_photo-1670985631837-60435eb933e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');



CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    post_img Text NOT NULL,
    post_date TIMESTAMP DEFAULT now()
);

INSERT INTO posts (user_id, title,description,   post_date, post_img) VALUES 
(1, 'HELLO','hello from the first post', '2023-04-05', 'https://images.unsplash.com/photo-1668936132135-f2844ef1735b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc2ODQ0Mg&ixlib=rb-4.0.3&q=80&w=1080');

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
    content TEXT NOT NULL,
    comment_data TIMESTAMP DEFAULT now()
);

INSERT INTO comments (user_id, post_id, content) VALUES (1, 1, 'WoW very nice');

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
    value  INTEGER NOT NULL
);

INSERT INTO votes (user_id, post_id, value) VALUES (1, 1, 1);

COMMIT;