module.exports = {
    getItineraryItems: async (req, res) => {
        const db = await req.app.get('db');
        const {user_id} = req.session.user;
        const {itineraryId} = req.params;
        const itineraryItems = await db.itinerary.get_all_itinerary_items_for_user(itineraryId)
        const itinerary = await db.itinerary.get_itinerary(itineraryId)
        console.log('itinerary=', itinerary)
        console.log('itineraryItems=', itineraryItems)
        res.status(200).send({itinerary, itineraryItems})
        // .catch(error => {
        //     console.log(error)
        // })
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
        const {day, newDuration} = req.body;
        // console.log('itineraryItemId=', itineraryItemId)
        // console.log('day=', day);
        // console.log('duration=', duration);
        db.itinerary.update_itinerary_items(day, newDuration, itineraryItemId)
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