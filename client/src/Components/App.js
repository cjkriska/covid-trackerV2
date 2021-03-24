import React, { useEffect, useState } from 'react';
import '../App.css';
import UsMap from './UsMap.js';

// Main Component - Renders map from SVG data
function App() {

    // Initializes statesData variable
    const [statesData, setStatesData] = useState(null);

    // Grabs stateData SVG image data and sets it to statesData variable
    useEffect(() => {
        (async () => {
            const res = await fetch('https://willhaley.com/assets/united-states-map-react/states.json');
            const statesData = await res.json();
            setStatesData(statesData);
        })();
    }, []);

    // If there is currently no statesData, displays loading
    if(!statesData) {
        return (
            <div>Loading...</div>
        );
    }
    
    // Renders the UsMap component using the SVG image (statesData)
    return (
        <div className="App">
            <UsMap statesData={statesData} />
        </div>
    );
    
}

export default App;