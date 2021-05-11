SELECT *
FROM itinerary_items
JOIN itinerary on itinerary.itinerary_id = itinerary_items.itinerary_id
WHERE itinerary_items.itinerary_id = $1;
