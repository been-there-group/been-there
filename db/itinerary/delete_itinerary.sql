DELETE
FROM itinerary
WHERE itinerary_id = $1 AND user_id = $2;