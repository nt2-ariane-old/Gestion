const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
module.exports.authorize = function (credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.


  return new Promise(function (resolve, reject) {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err)
        return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);
    });
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

module.exports.listEvents = function (auth) {
  const calendar = google.calendar({ version: 'v3', auth });

  var twoyearsfuture = new Date();
  twoyearsfuture.setDate(twoyearsfuture.getDate() + (365 * 2));
  var twoyearspast = new Date();
  twoyearspast.setDate(twoyearspast.getDate() - (365 * 2));

  return new Promise(function (resolve, reject) {
    try {

      calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        maxResults: 2500,
        timeMax: twoyearsfuture,
        timeMin: twoyearspast,
        singleEvents: true,
        orderBy: 'startTime',
      }, (err, res) => {
        if (!err) {
          resolve(res.data.items);
        } else {
          console.log(err)
          reject(err);
        }
      })
    } catch (error) {
      reject(error);
    }
  })

}
module.exports.getEvent = function (auth, params) {
  const calendar = google.calendar({ version: 'v3', auth });

  return new Promise(function (resolve, reject) {
    calendar.events.get({
      auth: auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId: params.id
    }, (err, res) => {
      if (!err) {
        resolve(res.data);
      } else {
        reject(Error(err));
      }
    })
  })

}
module.exports.deleteEvent = function (auth, params) {
  const calendar = google.calendar({ version: 'v3', auth });

  return new Promise(function (resolve, reject) {
    calendar.events.delete({
      auth: auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId: params.id
    }, (err, res) => {
      if (!err) {
        resolve(res.data);
      } else {
        reject(Error(err));
      }
    })
  })

}
module.exports.createEvent = function (auth, params) {
  const calendar = google.calendar({ version: 'v3', auth });


  // Example showing a change in the location

  let event = params.event
  console.log(event)
  return new Promise(function (resolve, reject) {
    calendar.events.insert({
      auth: auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
    }, function (err, event) {
      if (err) {
        reject('There was an error contacting the Calendar service: ' + err);
      }
      else {
        resolve(event.htmlLink);
      }
    });
  })


}