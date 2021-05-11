module.exports = {
    getItineraryItems: async (req, res) => {
        const db = await req.app.get('db');
        const {user_id} = req.session.user;
        const {itineraryId} = req.params;
        db.itinerary.get_all_itinerary_items_for_user(itineraryId, user_id)
        .then(items => res.status(200).send(items))
    },
    addItineraryItem: async (req, res) => {
        const db = await req.app.get('db');
        const {itineraryId} = req.params;
        const {day, place_id, place_name, duration} = req.body;
        db.itinerary.post_itinerary_items(day, place_id, place_name, itineraryId, duration)
        .then(items => res.status(200).send(items))
    },
    editItineraryItem: async (req, res) => {
        const db = await req.app.get('db');
        const {itineraryItemId} = req.params;
        const {day, duration} = req.body;
        console.log('itineraryItemId=', itineraryItemId)
        console.log('day=', day);
        console.log('duration=', duration);
        db.itinerary.update_itinerary_items(day, duration, itineraryItemId)
        .then(items => res.status(200).send(items))
    },
    deleteItineraryItem: async (req, res) => {
        const db = await req.app.get('db');
        const {itineraryItemId} = req.params;
        const {user_id} = req.session.user;
        db.itinerary.delete_itinerary_item(itineraryItemId, user_id)
        .then(items => res.status(200).send(items))
    }
}