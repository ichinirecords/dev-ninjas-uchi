CREATE TABLE admins (
	id SERIAL PRIMARY KEY,
	username VARCHAR(200),
	pass VARCHAR(200),
	email VARCHAR(200)
);

CREATE TABLE artwork (
	id SERIAL PRIMARY KEY,
	artist_name VARCHAR(200),
	title VARCHAR(400),
	current_location VARCHAR(100),
	city VARCHAR(200),
	country VARCHAR(200),
	lat NUMERIC,
	lon NUMERIC,
	content_type VARCHAR(20),
	content_text TEXT,
	content_link VARCHAR(200),
	created_on DATE,
	artwork_status VARCHAR(20),
	published_on DATE,
	admin_id INT,
	FOREIGN KEY (admin_id)
        REFERENCES admins (id)
);

INSERT INTO admins (username, pass) VALUES ('user1', '$2b$10$MVxoipkq1jsFrwZJeiE6Y.hXPC0aSkeYDrW5DMa2jXmUh1BDca2Yq'); //pw is qwerty

INSERT INTO artwork (artist_name, title, city, country, content_type, content_text, artwork_status) 
	VALUES ('test user', 'test title', 'Telford', 'UK', 'text', 'some random content', 'submitted'); 

INSERT INTO artwork (artist_name, title, city, country, content_type, content_text, artwork_status, lat, lon) 
	VALUES ('test user', 'test coord title', 'Telford', 'UK', 'text', 'some random content', 'submitted', 48.55347745, 14.819764449634476); 