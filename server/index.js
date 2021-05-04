//require statements for installs 
require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
//require controllers
const authCtrl = require('./controllers/auth');
const singleTripCtrl = require('./controllers/singleTripCtrl');
const allTripsCtrl = require('./controllers/allTripsCtrl');
const bucketCtrl = require('./controllers/bucketCtrl');

//middlware 
const app = express();

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
app.use(express.json());

//session stuff 
app.use(session ({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
})
);


//Auth Endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/logout', authCtrl.logout);
app.get('/api/get-me', authCtrl.getMe);
app.put('/api/edit', authCtrl.edit);


//All Trips (Itineraries) Endpoints
app.get('/api/alltrips', allTripsCtrl.getItineraries);
app.post('/api/alltrips', allTripsCtrl.addItinerary);
app.put('/api/alltrips/:itineraryId', allTripsCtrl.editItinerary);
app.delete('/api/alltrips/:itineraryId', allTripsCtrl.deleteItinerary);

//Single Trip (Itinerary Items) Endpoints
app.get('/api/singletrip/:itineraryId', singleTripCtrl.getItineraryItems); 
app.post('/api/singletrip/:itineraryId', singleTripCtrl.addItineraryItem); 
app.put('/api/singletrip/:itineraryItemId', singleTripCtrl.editItineraryItem);
app.delete('/api/singletrip/:itineraryItemId', singleTripCtrl.deleteItineraryItem);

//Bucket Endpoints 
app.get('/api/bucketList/:id', bucketCtrl.getAllSaved); //looks at all the saved places by a certain user_id
app.post('/api/save', bucketCtrl.savePlace); //saves a place based on a place_id - but uses a request body.
app.put('/api/remove/:id', bucketCtrl.removeBucketItem) //removes a bucket item based on place id.. but maybe ALSO user_id?
app.delete('/api/delete/:id', bucketCtrl.deleteAll) //deletes all bucket items from a user based on user_id


//massive 
massive ({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    }
})
.then(db => {
    app.set("db", db);
    app.listen(SERVER_PORT, () => console.log(`DB Up and Server Running On ${SERVER_PORT}`))
})
.catch(err => console.log(err))