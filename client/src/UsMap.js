import React, {useState, useEffect} from "react";

function UsMap(props) {

    const {statesData} = props;

    const [response, setResponse] = useState([]);
    const [post, setPost] = useState('');
    const [responseToPost, setResponseToPost] = useState('');

    const handleClick = async e => {
        e.preventDefault();
        let stateName = statesData[e.target.id].name;
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post: stateName})
        });
        const body = await response.text();
        let resp = JSON.parse(body);
        setResponseToPost(formatting(resp));

    };

    // Should be component
    const formatting = resp => {
        return (
            <>
                <b>{resp.province}: </b><br />
                <p>Cases: {resp.cases.toLocaleString()} Deaths: {resp.deaths.toLocaleString()}</p>
            </>
        );
    };

    return (
        <>  
            <div>{responseToPost}</div>
            <svg viewBox="0 0 960 600">
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
        </>
    );
}

export default UsMap;