//require statements for installs 
require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
//require controllers
const authCtrl = require('./controllers/auth');
const singleTripCtrl = require('./controllers/singleTripCtrl');
const allTripsCtrl = require('./controllers/allTripsCtrl');

//middlware 
const app = express();

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
app.use(express.json());

//session stuff 
app.use(session ({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
})
);

//endpoints 

//Auth Endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/logout', authCtrl.logout);

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