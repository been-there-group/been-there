-- CREATE TABLE users (
-- user_id SERIAL PRIMARY KEY,
-- username VARCHAR(55) NOT NULL UNIQUE,
-- password VARCHAR(255) NOT NULL,
-- email TEXT UNIQUE,
-- profile_pic TEXT NOT NULL
-- );


-- CREATE TABLE comments (
-- comment_id SERIAL PRIMARY KEY,
-- comment VARCHAR(2000) NOT NULL,
-- user_id  INTEGER references users(user_id),
-- place_id TEXT NOT NULL
-- );

-- CREATE TABLE ratings (
-- rating_id SERIAL PRIMARY KEY,
-- place_id TEXT NOT NULL,
-- rating integer NOT NULL,
-- user_id INTEGER references users(user_id)
-- );

-- CREATE TABLE bucket_locations (
-- location TEXT NOT NULL,
-- user_id INTEGER references users(user_id)
-- );

-- CREATE TABLE bucket_activities (
-- place_id TEXT NOT NULL,
-- user_id INTEGER references users(user_id)
-- );

-- CREATE TABLE itinerary (
-- itinerary_id SERIAL PRIMARY KEY,
-- user_id INTEGER references users(user_id),
-- itinerary_name VARCHAR(40) NOT NULL
-- );

-- CREATE TABLE itinerary_items (
-- itinerary_item_id SERIAL PRIMARY KEY,
-- day DATE,
-- place_id TEXT NOT NULL,
-- itinerary_id INTEGER references itinerary(itinerary_id) NOT NULL,
-- duration numeric(3, 1)
-- );
