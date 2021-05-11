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

//aws stuff
const aws = require('aws-sdk');

const { S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

app.get('/api/signs3', (req, res) => {
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    return res.send(returnData);
  });
});


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
app.put('/api/editstart', allTripsCtrl.editItineraryStartDate);
app.put('/api/alltrips/end', allTripsCtrl.editItineraryEndDate);
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