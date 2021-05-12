UPDATE users
SET username = $1, profile_pic = $2, email = $3
WHERE user_id = $4;
SELECT username , user_id , profile_pic FROM users
WHERE user_id = $4;
