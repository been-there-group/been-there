UPDATE itinerary
SET
itinerary_name = $1
WHERE user_id = $2;