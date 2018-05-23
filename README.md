# LearnCool YouTube Search

It is a web application to search videos based on query entered.

### Installing

* clone the directory
* install the requirements
``` npm install```

* If you do not have ```client-secret.json``` then follow these steps to get your credentials.

  Use https://console.developers.google.com/flows/enableapi?apiid=youtube to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.

  On the Add credentials to your project page, click the Cancel button.

  At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.

  Select the Credentials tab, click the Create credentials button and select OAuth client ID.

  Select the application type Other, enter the name "YouTube Data API Quickstart", and click the Create button.

  Click OK to dismiss the resulting dialog.

  Click the (Download JSON) button to the right of the client ID.

  Move the downloaded file to your working directory and rename it client_secret.json.

* run ``` node src/saveCreds.js```
* go to the link displayed on screen and authorise your app by submitting the token.
* now run the server by ```node src/server```
* run the application ```npm start```