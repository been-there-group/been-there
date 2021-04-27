INSERT INTO ratings (place_id, rating, user_id)
VALUES ($1, $2, $3);

SELECT * FROM ratings
WHERE place_id = $1;
