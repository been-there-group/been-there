DELETE
FROM bucket_activities
WHERE place_id = $1 AND user_id = $2;