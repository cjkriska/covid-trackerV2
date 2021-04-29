import React, {useState} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

// Renders formatting for Graph
// Passes in covid data (props) and returns formatting for Graph
function Graph(props) {


    // If there is no data, (state has not been clicked yet) returns nothing
    if(!props.respo) {
        return null;
    }

    const data = props.respo.graph;
    const stateName = props.respo.current.province;

    return (
      <>
        <h2>{stateName}</h2>
        <button>Cases</button>
        <button>Deaths</button>
        <LineChart
          width={400}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
        </LineChart>
      </>
    );

}

export default Graph;