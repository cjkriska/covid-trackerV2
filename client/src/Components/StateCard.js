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
    const {province, cases, deaths, recoveries, activeCases} = props.respo.current;

    // Renders the formatting for the State Card
    return (
        <div className={props.className}>
            <h2 className="card-heading">{province}</h2>
            <hr />
            <p>
                <b>Cases:</b> {cases.toLocaleString()}<br />
                <b>Deaths:</b> {deaths.toLocaleString()}<br />
                <b>Recoveries:</b> {recoveries.toLocaleString()}<br />
                <b>Active Cases:</b> {activeCases.toLocaleString()}
            </p>
        </div>
    );

}

export default StateCard;