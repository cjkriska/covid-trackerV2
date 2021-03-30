import React, {useState} from "react";
import StateCard from './StateCard.js'

function UsMap(props) {

    // Renames the inputted props.statesData as statesData
    const {statesData} = props;
    
    // Initializes responseToPost variable
    const [responseToPost, setResponseToPost] = useState('');

    // handleClick function called when a specific state is clicked
    // Passes event (e) that has properties of the specific state clicked
    const handleClick = async e => {
        e.preventDefault();
        // Saves the name of the state clicked as stateName
        let stateName = statesData[e.target.id].name;
        // Calls the backend (server.js), POST request, inputting stateName
        // Returns response with data fetched from the API in server.js
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post: stateName})
        });
        const body = await response.text();
        let resp = JSON.parse(body);
        // Sets responseToPost variable as the resp object returned from server.js
        setResponseToPost(resp);
    };


    // Renders the state card with covid data (state name, cases, and deaths)
    // Also renders the individual states with properties required for identification and function
    return (
        <>
        <div className="main">
            <div className="map"> 
                <svg width="90%" viewBox="0 0 960 600">
                    {statesData.map((stateData, index) => 
                    
                    <path
                        className="path-class"
                        style={{cursor: "pointer", fill: "purple"}}
                        key={index}
                        id={index}
                        stroke="#fff"
                        strokeWidth="6px"
                        d={stateData.shape}
                        onMouseOver={(event) => {
                            event.target.style.fill = 'red';
                        }}
                        onMouseOut={(event) => {
                            event.target.style.fill = 'purple';
                        }}
                        onClick={handleClick}
                    >
                    </path>
                )
                }
                </svg>
            </div>
            <div className="state-info">
                <StateCard className="state-card" respo={responseToPost} />
            </div>
        </div>
        </>
    );





    // // Should be component
    // const formatting = resp => {
    //     return (
    //         <>
    //             <b>{resp.province}: </b><br />
    //             <p>Cases: {resp.cases.toLocaleString()} Deaths: {resp.deaths.toLocaleString()}</p>
    //         </>
    //     );
    // };


}

export default UsMap;