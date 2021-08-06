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
    const {province, cases, deaths, recoveries, activeCases, fullyVaccinated, population, riskLevel} = props.respo.current;

    const calculateVaccinatedPercent = (vacc, pop) => {
        let percent = (vacc/pop)*100;
        return Math.floor(percent).toLocaleString();
    };

    // Renders the formatting for the State Card
    return (
        <div className={props.className}>
            <h2 className="card-heading">{province}</h2>
            <hr />
            <p>
                <b>Cases:</b> {cases.toLocaleString()}<br />
                <b>Deaths:</b> {deaths.toLocaleString()}<br />
                <b>Recoveries:</b> {recoveries.toLocaleString()}<br />
                <b>Active Cases:</b> {activeCases.toLocaleString()}<br />
                <b>Fully Vaccinated</b> {fullyVaccinated.toLocaleString()}<br />
                <b>Population:</b> {population.toLocaleString()}<br />
                <b>Fully Vaccinated Percent: </b> {calculateVaccinatedPercent(fullyVaccinated, population)}%<br />
                <b>Risk Level:</b> {riskLevel}<br />
            </p>
        </div>
    );

}

export default StateCard;