// SETUP - Sets up express --------------------------
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const path = require('path');

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







// The app.post function will run when '/api/current' is requested from the browser
// This is requested in UsMap.js when a state is clicked (when handleClick is called)
// It returns the data requested for the province selected
app.post('/api/current', (req, res) => {
    // Saves the selected province as provinceName
    let provinceId = req.body.post.stateId;
    let provinceName = req.body.post.stateName;
    const apiKey = "98bcd96f014240558f710ccd0b52b612";
    const url = "https://api.covidactnow.org/v2/state/" + provinceId + 
                ".timeseries.json?apiKey=" + apiKey;
    const url2 = "https://disease.sh/v3/covid-19/states/" + provinceName;
    let currentResp = {};
    let graphResp = {};

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
            const provinceData = JSON.parse(data);
            cases = provinceData.actuals.cases;
            deaths = provinceData.actuals.deaths;

            https.get(url2, (response) => {
                data = "";

                response.on("data", (chunk) => {
                    data += chunk;
                });
                response.on("end", () => {
                    const provinceData2 = JSON.parse(data);
                    recoveries = provinceData2.recovered;
                    activeCases = provinceData2.active;

                    currentResp = {
                        province: provinceName,
                        cases: cases,
                        deaths: deaths,
                        recoveries: recoveries,
                        activeCases: activeCases
                    };
        
                    graphResp = provinceData.actualsTimeseries;
        
                    console.log(currentResp);

                    res.send({
                        current: currentResp,
                        graph: graphResp
                    });

                });
            });

        });

    });

});






// For Production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.listen(port, () => console.log('Listening on port ' + port));