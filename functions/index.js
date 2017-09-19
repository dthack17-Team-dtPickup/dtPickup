//-------------------------------------------
//const bunyan = require('bunyan');

// Imports the Google Cloud client library for Bunyan
//const LoggingBunyan = require('@google-cloud/logging-bunyan');

// Instantiates a Bunyan Stackdriver Logging client
//const loggingBunyan = LoggingBunyan();

// Create a Bunyan logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
//const logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Stackdriver Logging
  // will contain "name": "my-service"
//  name: 'dtpickuptest',
  // log at 'info' and above
//  level: 'info',
//  streams: [
    // Log to the console
//    { stream: process.stdout },
    // And log to Stackdriver Logging
//    loggingBunyan.stream()
//  ]
//});

// Writes some log entries


// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    admin.database().ref('/messages').push({original: original}).then(snapshot => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      res.redirect(303, snapshot.ref);
    });
  });

   
  // Listens for new messages added to /messages/:pushId/original and creates an
  // uppercase version of the message to /messages/:pushId/uppercase
  exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
      .onWrite(event => {
        // Grab the current value of what was written to the Realtime Database.
        const original = event.data.val();
        console.log('Uppercasing', event.params.pushId, original);
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return event.data.ref.parent.child('uppercase').set(uppercase);
      });

exports.dtsetrequest = functions.https.onRequest((req, res) => {

    // Grab the text parameter.
    const obj = JSON.parse(req.query.json);

    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    console.log("obj: ", obj);

    admin.database().ref('/rides').push({[obj.routeid] : obj.clienttoken}).then(snapshot => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      res.redirect(303, snapshot.ref);
    });
});


exports.dtonrequest = functions.database.ref('/rides/{pushId}')
      .onWrite(event => {
      const jsonobject = event.data.val();
      console.log("requesting id=", event.params.pushId, jsonobject);


// This registration token comes from the client FCM SDKs.

      var obj = JSON.parse(jsonobject); 
      var registrationToken = obj.clienttoken;
      var routeId = obj.routeId;
      console.log("registrationToken=", obj.clienttoken, obj.routeId);

	// Send a message to the device corresponding to the provided
	// registration token.
	admin.messaging().sendToDevice(registrationToken, routeId)
	  .then(function(response) {
	    // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });
      return event.data.ref.parent.child('uppercase').set(uppercase);
})
