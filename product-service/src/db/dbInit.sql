CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE product (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title text NOT NULL,
	description text,
	price integer
);

CREATE TABLE stock (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_id uuid,
	count integer,
	FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE CASCADE
);

INSERT INTO product (title, description, price) VALUES
    ('Cat', 'so sweet', 25),
    ('Dog', 'so funny', 45),
    ('Mouse', 'so nice', 20),
    ('Rabbit', 'so gray', 10)

INSERT INTO stock (product_id, count) VALUES
    ((SELECT id FROM product WHERE title = 'Cat'), 10),
    ((SELECT id FROM product WHERE title = 'Dog'), 5),
    ((SELECT id FROM product WHERE title = 'Mouse'), 5),
    ((SELECT id FROM product WHERE title = 'Rabbit'), 10),
