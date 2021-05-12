SELECT *
FROM itinerary_items
WHERE itinerary_items.itinerary_id = $1;

-----THIS DOESN'T WORK IF ONE OF THE TABLES IS EMPTY-----
-- SELECT *
-- FROM itinerary_items
-- JOIN itinerary on itinerary.itinerary_id = itinerary_items.itinerary_id
-- WHERE itinerary_items.itinerary_id = $1;
