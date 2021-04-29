import React, {useEffect, useState} from "react";
import StateCard from './StateCard.js';
import Graph from './Graph.js';

function UsMap(props) {

    // Renames the inputted props.statesData as statesData
    const {statesData} = props;
    
    // Initializes response and responseToPost variable
    const [responseToPost, setResponseToPost] = useState('');
    const [response, setResponse] = useState('');
    

    useEffect(() => {
        callApi()
            .then(res => setResponse(res.express))
            .catch(err => console.log(err));

    }, []);

    const callApi = async () => {
        const response = await fetch('api/hello');
        const body = await response.json();
        if(response.status !== 200) throw Error(body.message);

        return body;
    };






    // handleClick function called when a specific state is clicked
    // Passes event (e) that has properties of the specific state clicked
    const handleClick = async e => {
        e.preventDefault();
        // Saves the id of the state clicked as stateId
        let stateId = statesData[e.target.id].id;
        let stateName = statesData[e.target.id].name;
        // Calls the backend (server.js), POST request, inputting stateName
        // Returns response with data fetched from the API in server.js
        const response = await fetch('/api/current', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post: {stateId: stateId, stateName: stateName} })
        });
        const body = await response.text();
        let resp = JSON.parse(body);
        // Sets responseToPost variable as the resp object returned from server.js
        setResponseToPost(resp);
    };





    // Handle button clicks
    const handleCasesClick = e => {
        const dataType = 'Cases';
        setMap(fillAllStatesColor(dataType));
        setMapKey(createMapKey(0, 14, dataType));

    };
    const handleDeathsClick = e => {
        const dataType = 'Deaths';
        setMap(fillAllStatesColor(dataType));
        setMapKey(createMapKey(0, 0.29, dataType));

    };
    const handleVaccinationsClick = e => {
        const dataType = 'Vaccinations';
        setMap(fillAllStatesColor(dataType));
        setMapKey(createMapKey(20, 40, dataType));

    };
    const handleRiskLevelClick = e => {
        const dataType = 'Risk Level';
        setMap(fillAllStatesColor(dataType));
        setMapKey(createMapKey(1, 5, dataType));

    };





    const fillStateColor = (id, dataType) => {
        // Only Cases/Population for now
        let stateObject = {};
        for(let i=0; i < response.length; i++) {
            if(id === response[i].id) {
                stateObject = response[i];
            }
        }
        let color ='';
        let x;
        switch(dataType) {
            case 'Cases':
                x = (stateObject.cases / stateObject.population)*100;
                console.log(x);
                color = colorCompute(x, 0, 14, false);
                break;
            case 'Deaths':
                x = (stateObject.deaths / stateObject.population)*100;
                console.log(x);
                color = colorCompute(x, 0, 0.29, false);
                break;
            case 'Vaccinations':
                x = (stateObject.fullyVaccinated / stateObject.population)*100;
                console.log(x);
                color = colorCompute(x, 20, 40, true);
                break;
            case 'Risk Level':
                console.log(stateObject.riskLevel);
                if(stateObject.riskLevel === 0) {
                    color = 'rgb(0, 255, 150)';
                } else if(stateObject.riskLevel === 1) {
                    color = 'rgb(127, 255, 150)';
                } else if(stateObject.riskLevel === 2) {
                    color = 'rgb(255, 255, 150)';
                } else if(stateObject.riskLevel === 3) {
                    color = 'rgb(255, 127, 150)';
                } else if(stateObject.riskLevel === 4) {
                    color = 'rgb(255, 0, 150)';
                }
                break;
            default:
                color = 'purple';
        }

        return color;
    };






    // Utility function that computes the color a state should be based on the percentage given
    // Takes in a percentage, minimum and maximum percent used in calculation, and whether it should reverse the colors
    const colorCompute = (percentage, minPercent, maxPercent, reverse) => {
        const gradientPercent = Math.floor(((percentage-minPercent)/(maxPercent-minPercent))*100);
        let red = 255;
        let green = 255;
        if(gradientPercent < 50) {
            red = Math.floor(gradientPercent*5.1);
        } else {
            green = 255 - Math.floor((gradientPercent-50)*5.1);
        }

        if(reverse) {
            return 'rgb(' + green + ', ' + red + ', 150)';
        }

        return 'rgb(' + red + ', ' + green + ', 150)';

    };






    // Generates each state on the map: takes in the color each state should be based on the fillStateColor function
    const fillAllStatesColor = (dataType) => {
        return statesData.map((stateData, index) => 
                    <path
                        className="path-class"
                        style={{cursor: "pointer", fill: fillStateColor(stateData.id, dataType)}}
                        key={index}
                        id={index}
                        stroke="#fff"
                        strokeWidth="6px"
                        d={stateData.shape}
                        onMouseOver={(event) => {
                            event.target.style.fill = 'red';
                        }}
                        onMouseOut={(event) => {
                            event.target.style.fill = fillStateColor(stateData.id, dataType);
                        }}
                        onClick={handleClick}
                    >
                        
                    </path>
                );
    };

    const createMapKey = (min, max, type) => {
        let percent = "%";
        let style = {background: 'linear-gradient(90deg, rgb(0, 255, 150), rgb(255, 255, 150), rgb(255, 0, 150))'}
        let riskStyle = {marginRight: '60%'};
        if(type === 'Risk Level') {
            percent = "";
            riskStyle = {marginRight: '85%'};
        }
        if(type === 'Vaccinations') {
            style = {background: 'linear-gradient(90deg, rgb(255, 0, 150), rgb(255, 255, 150), rgb(0, 255, 150))'}
        }
        return (
            <>
                <h3>{type}</h3>
                <div className="map-key" style={style}>
                    <div className="map-key-min" style={riskStyle}><strong>{min + percent}</strong></div>
                    <div className="map-key-max"><strong>{max + percent}</strong></div>
                </div>
            </>
        );
    };

    // Initializes map state and key
    const [map, setMap] = useState(fillAllStatesColor());
    const [mapKey, setMapKey] = useState('');


    // Renders the state card with covid data (state name, cases, and deaths)
    // Also renders the individual states with properties required for identification and function
    return (
        <>
        <div className="main">
            <div className="buttons">
                <button onClick={handleCasesClick}>Cases</button>
                <button onClick={handleDeathsClick}>Deaths</button>
                <button onClick={handleVaccinationsClick}>Vaccinations</button>
                <button onClick={handleRiskLevelClick}>Risk Level</button>
            </div>
            <div>{mapKey}</div>
            <div className="map"> 
                <svg width="90%" viewBox="0 0 960 600">
                    {map}
                </svg>
            </div>

            <div className="state-info">
                <Graph className="graph" respo={responseToPost} />
                <StateCard className="state-card" respo={responseToPost} />
            </div>

        </div>
        </>
    );

}

export default UsMap;