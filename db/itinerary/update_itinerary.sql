UPDATE itinerary
SET itinerary_name = $1
WHERE itinerary_id = $2 AND user_id = $3;
