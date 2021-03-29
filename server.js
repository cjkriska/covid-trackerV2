// SETUP - Sets up express --------------------------
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// --------------------------------------------------




// --------- NOT BEING USED -------------------------
// --------------------------------------------------
// The app.get function runs when '/api/hello' is requested from the browser.
// It will return an array of province names (states)
app.get('/api/hello', (req, res) => {
    // This is the Corona API url that the data is requested from
    const url = "https://disease.sh/v2/states?sort=&yesterday=";

    https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            // covidData is the data response when the url is requested, it is an array of
            // objects, each object has information about each province
            const covidData = JSON.parse(data);
            var provinceList = [];
            // Goes through the covidData and gets only the province name and puts it
            // into an array (provinceList);
            for(let i=0; i < covidData.length; i++) {
                provinceList.push(covidData[i].state);
            }
            // Sends the provinceList back to the front end, where it was called
            res.send(
                {express: provinceList}
            );
        });
    });
});
// --------------------------------------------------
// --------------------------------------------------


// The app.post function will run when '/api/world' is requested from the browser
// This is requested in UsMap.js when a state is clicked (when handleClick is called)
// It returns the data requested for the province selected
app.post('/api/world', (req, res) => {
    // Saves the selected province as provinceName
    let provinceName = req.body.post;
    const url = "https://disease.sh/v2/states?sort=&yesterday=";

    https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            let cases = "";
            let deaths = "";
            let recoveries = "";
            let activeCases = "";
            let resp = {};
            const provinceData = JSON.parse(data);
            // Goes through the data for each province. If the selected provinceName
            // matches the current province in the data, it will save the cases and deaths
            for(let i=0; i < provinceData.length; i++) {
                if(provinceName === provinceData[i].state) {
                    cases = provinceData[i].cases;
                    deaths = provinceData[i].deaths;
                    recoveries = provinceData[i].recovered;
                    activeCases = provinceData[i].active;

                    // Saves data for selected province in a JS Object
                    resp = {
                        province: provinceName,
                        cases: cases,
                        deaths: deaths,
                        recoveries: recoveries,
                        activeCases: activeCases
                    }
                    // Logs the full data for the province in the console (for debugging)
                    console.log(provinceData[i]);
                }
            }

            // Sends the province name, cases, and deaths back to UsMap.js
            res.send(resp);

        });
    });

});

app.listen(port, () => console.log('Listening on port ' + port));