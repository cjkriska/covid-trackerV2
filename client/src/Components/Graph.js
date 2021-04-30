import React, {useState} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

// Renders formatting for Graph
// Passes in covid data (props) and returns formatting for Graph
function Graph(props) {

    const [casesGraph, setCasesGraph] = useState("cases");
    const [deathsGraph, setDeathsGraph] = useState("");
    const [vaccinationsGraph, setVaccinationsGraph] = useState("");
    const [deathsAxis, setDeathsAxis] = useState("left");

    // If there is no data, (state has not been clicked yet) returns nothing
    if(!props.respo) {
        return null;
    }

    const data = props.respo.graph;
    const stateName = props.respo.current.province;

    // Handle Graph Button Clicks
    const handleCasesGraphClick = () => {
      if(!casesGraph) {
        setCasesGraph("cases");
      } else {
        setCasesGraph("");
      }
    };
    const handleDeathsGraphClick = () => {
      if(!deathsGraph) {
        setDeathsGraph("deaths");
      } else {
        setDeathsGraph("");
      }
    };
    const handleVaccinationsGraphClick = () => {
      if(!vaccinationsGraph) {
        setVaccinationsGraph("vaccinationsCompleted");
      } else {
        setVaccinationsGraph("");
      }
    };
    const handleDeathsAxisClick = () => {
      if(deathsAxis === "left") {
        setDeathsAxis("right");
      } else if(deathsAxis === "right") {
        setDeathsAxis("left");
      }
    }
    



    return (
      <>
        <h2>{stateName}</h2>
        <button className="btn" onClick={handleCasesGraphClick}>Cases</button>
        <button className="btn" onClick={handleDeathsGraphClick}>Deaths</button>
        <button className="btn" onClick={handleVaccinationsGraphClick}>Vaccinations</button>
        <button className="btn" onClick={handleDeathsAxisClick}>Enable Separate Deaths Axis</button>
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
          <YAxis yAxisId="left"/>
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey={casesGraph} stroke="orange" activeDot={{ r: 8 }} />
          <Line yAxisId={deathsAxis} type="monotone" dataKey={deathsGraph} stroke="#82ca9d" />
          <Line yAxisId="left" connectNulls type="monotone" dataKey={vaccinationsGraph} stroke="#8884d8" />
        </LineChart>
      </>
    );

}

export default Graph;