INSERT INTO comments (comment, user_id, place_id)
VALUES ($1, $2, $3);
SELECT * FROM comments
WHERE place_id = $3;
