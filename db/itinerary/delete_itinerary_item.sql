DELETE
FROM itinerary_items
WHERE itinerary_item_id = $1;
SELECT * from itinerary_items where user_id = $2;