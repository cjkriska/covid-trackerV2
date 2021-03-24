import React, { useEffect, useState } from "react";
import UsMap from "./UsMap.js";

function Map() {
    const [statesData, setStatesData] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await fetch('https://willhaley.com/assets/united-states-map-react/states.json');
            const statesData = await res.json();
            setStatesData(statesData);
        })();
    }, []);

    if(!statesData) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <UsMap statesData={statesData}/>
    );

}

export default Map;