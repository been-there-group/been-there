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
        const {place_id, place_name, bucket_list_image} = req.body
        console.log(place_id, place_name)
        const db = await req.app.get('db')

        if(user_id) {
            db.bucket.post_bucket_activity(place_id, place_name, user_id, bucket_list_image)
            .then(() => res.sendStatus(200))
        } else {
            return res.sendStatus(404)
        }
    },

    removeBucketItem: (req, res) => {
        const { user_id } = req.session.user
        const db = req.app.get('db')
        if(user_id){
            db.bucket.delete_bucket_activity(req.params.id)
            .then(() => res.sendStatus(200))
        } else {
            return res.sendStatus(404)
        }


    },

    deleteAll: (req, res) => {
        const { user_id } = req.session.user
        const db = req.app.get('db')
        if(user_id){
            db.bucket.delete_all_from_user(req.params.id)
            .then(() => res.sendStatus(200))
        } else {
            return res.sendStatus(404)
        }
    }
};