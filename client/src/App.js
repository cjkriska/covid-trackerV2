import React, {useEffect, useState} from 'react';
import './App.css';
import Map from './Map.js';

function App() {

    const [response, setResponse] = useState([]);
    const [post, setPost] = useState('');
    const [responseToPost, setResponseToPost] = useState('');
    let provinces;

    useEffect(() => {
        callApi()
            .then(res => setResponse(res.express))
            .catch(err => console.log(err));
    });

    const callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if(response.status !== 200) throw Error(body.message);

        return body;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post: post})
        });
        const body = await response.text();

        setResponseToPost(body);
        
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <h1>Coronavirus Tracker</h1>
                <select onChange={e => setPost(e.target.value)}>
                    {
                        response.map(province => {
                            return (
                                <option value={province}> {province} </option>
                            )
                        })
                    }
                </select>
            <button type="submit">Submit</button>
            </form>
            <p>{responseToPost}</p>
            <Map />
        </div>
    );





}

export default App;
