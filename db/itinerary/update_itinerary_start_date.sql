UPDATE itinerary
SET start_date = $1
WHERE itinerary_id = $2 AND user_id = $3;
SELECT * from itinerary where user_id = $3;