var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';


function getAuth(){
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        var credentials = JSON.parse(content);
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];
        var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, function(err, token) {
            if (err) {
                getNewToken(oauth2Client);
            } else {
                oauth2Client.credentials = JSON.parse(token);
                return oauth2Client;
            }
        });
    });

    function getNewToken(oauth2Client) {
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function(code) {
            rl.close();
            oauth2Client.getToken(code, function(err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                storeToken(token);
                return oauth2Client
            });
        });
    }

    function storeToken(token) {
        try {
            fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) throw err;
            console.log('Token stored to ' + TOKEN_PATH);
        });
        console.log('Token stored to ' + TOKEN_PATH);
    }

}

exports.search = function (keyword) {
    var service = google.youtube('v3');
    var auth = getAuth();
    service.search.list({
            auth: auth,
            part: 'id,snippet',
            q: keyword
        },function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var result = response.data.items;
        if (channels.length == 0) {
            console.log('Not found.');
        } else {
            var return_data = [];
            console.log(result);
            for (var i=0; i<result.length; i++) {
                if (result[i].id.kind=="youtube#video"){
                    return_data.push({
                        "id":result[i].id.videoId,
                        "title":result[i].snippet.title,
                        "channel":result[i].snippet.channelTitle,
                        "thumb_url":result[i].snippet.thumbnails.url,
                        "description":result[i].snippet.description
                    })
                }
            return return_data;
            }
        }
    });
}






