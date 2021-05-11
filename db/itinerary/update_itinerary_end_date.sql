UPDATE itinerary
SET end_date = $1
WHERE itinerary_id = $3 AND user_id = $4;
SELECT * from itinerary where user_id = $4;