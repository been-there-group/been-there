UPDATE itinerary_items
SET
day = $1, duration = $2
WHERE itinerary_item_id = $3;