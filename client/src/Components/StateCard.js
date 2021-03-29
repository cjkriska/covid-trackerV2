import React from 'react';

// Renders formatting for State Card
// Passes in covid data (props) and returns formatting for State Card
function StateCard(props) {

    // If there is no data, (state has not been clicked yet) returns nothing
    if(!props.respo) {
        return null;
    }

    // Renames the inputted props.respo as its object properties:
    // province, cases, and deaths
    const {province, cases, deaths, recoveries, activeCases} = props.respo;

    // Renders the formatting for the State Card
    return (
        <>
            <h3>{province}: </h3>
            <p>
                Cases: {cases.toLocaleString()}<br />
                Deaths: {deaths.toLocaleString()}<br />
                Recoveries: {recoveries.toLocaleString()}<br />
                Active Cases: {activeCases.toLocaleString()}
            </p>
        </>
    );

}

export default StateCard;