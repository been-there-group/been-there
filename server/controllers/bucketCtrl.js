module.exports = {
    getAllSaved: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')

        if(id) {
            return db.bucket.get_all_bucket_activities(id)
            .then(bucketActivities => res.status(200).send(bucketActivities))
        }
    },

    savePlace: async (req, res) => {
        const { user_id } = req.session.user
        console.log(user_id)
        const { place } = req.params
        console.log(place)
        const db = await req.app.get('db')

        if(user_id) {
            db.bucket.post_bucket_activity(place, user_id)
            .then(() => res.sendStatus(200))
        } else {
            return res.sendStatus(404)
        }
    },

    // removeBucketItem: (req, res) => {

    // },

    // deleteAll: (req, res) => {

    // }
}