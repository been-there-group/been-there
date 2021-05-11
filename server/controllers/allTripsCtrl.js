module.exports = {
    getItineraries: async (req, res) => {
        const db = await req.app.get('db');
        const {user_id} = req.session.user;
        db.itinerary.get_all_itineraries_for_user(user_id)
        .then(itineraries => res.status(200).send(itineraries))
    },
    addItinerary: async (req, res) => {
        const db = await req.app.get('db');
        const {user_id} = req.session.user;
        const {itineraryName} = req.body;
        db.itinerary.post_itinerary(user_id, itineraryName)
        .then(itineraries => res.status(200).send(itineraries))
    },
    editItinerary: async (req, res) => {
        const db = await req.app.get('db');
        const {user_id} = req.session.user;
        const {itineraryId} = req.params;
        const {itinerary_name} = req.body;
        console.log("user_id", user_id)
        console.log("id=", itineraryId)
        console.log("name=", itinerary_name)
        db.itinerary.update_itinerary(itinerary_name, itineraryId, user_id)
        .then(itineraries => res.status(200).send(itineraries))
    },
    editItineraryStartDate: async (req, res) => {
        const db = await req.app.get('db');
        const {user_id} = req.session.user;
        const {itinerary_id, start_date} = req.body;
        db.itinerary.update_itinerary_start_date(start_date, itinerary_id, user_id)
        .then(itineraries => res.status(200).send(itineraries))
    },
    editItineraryEndDate: async (req, res) => {
        const db = await req.app.get('db');
        const {user_id} = req.session.user;
        const {itinerary_id, end_date} = req.body;
        db.itinerary.update_itinerary_end_date(end_date, itinerary_id, user_id)
        .then(itineraries => res.status(200).send(itineraries))
    },
    deleteItinerary: async (req, res) => {
        const db = await req.app.get('db');
        const {user_id} = req.session.user;
        const {itineraryId} = req.params;
        db.itinerary.delete_itinerary(itineraryId, user_id)
        .then(itineraries => res.status(200).send(itineraries))
    }
}