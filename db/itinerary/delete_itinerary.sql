DELETE
FROM itinerary_items
WHERE itinerary_id = $1;
DELETE 
FROM itinerary
WHERE itinerary_id = $1 AND user_id = $2;
SELECT * from itinerary where user_id = $2;