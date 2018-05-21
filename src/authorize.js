var fs = require('fs');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';


exports.getAuth = function(){
    var promise = new Promise((resolve,reject)=>{
        fs.readFile('client_secret.json', function processClientSecrets(err, content) {
            if (err) {
                console.log('Error loading client secret file: ' + err);
                reject(err);
            }
            var credentials = JSON.parse(content);
            var clientSecret = credentials.installed.client_secret;
            var clientId = credentials.installed.client_id;
            var redirectUrl = credentials.installed.redirect_uris[0];
            var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
            fs.readFile(TOKEN_PATH, function(err, token) {
                oauth2Client.credentials = JSON.parse(token);
                if(err){
                    reject(err)
                } else{
                    resolve(oauth2Client)
                }
            });
        });

    });
    return promise
};








