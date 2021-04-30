UPDATE users 
SET username = $1, profile_pic = $2, email = $3
WHERE user_id = $4;
SELECT * FROM users
WHERE user_id = $4;
