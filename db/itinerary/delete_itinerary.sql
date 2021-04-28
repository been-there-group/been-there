DELETE
FROM itinerary
WHERE itinerary_name = $1 AND user_id = $2;