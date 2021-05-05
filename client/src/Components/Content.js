import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default (props) => {

  const [casesGraph, setCasesGraph] = useState("cases");
  const [deathsGraph, setDeathsGraph] = useState("");
  const [vaccinationsGraph, setVaccinationsGraph] = useState("");
  const [newCasesGraph, setNewCasesGraph] = useState("");
  const [newDeathsGraph, setNewDeathsGraph] = useState("");
  const [Axis, setAxis] = useState("left");

  // Button states
  const [casesGraphButton, setCasesGraphButton] = useState("btn btn-secondary");
  const [deathsGraphButton, setDeathsGraphButton] = useState("btn btn-outline-secondary");
  const [vaccinationsGraphButton, setVaccinationsGraphButton] = useState("btn btn-outline-secondary");
  const [newCasesGraphButton, setNewCasesGraphButton] = useState("btn btn-outline-secondary");
  const [newDeathsGraphButton, setNewDeathsGraphButton] = useState("btn btn-outline-secondary");
  const [addAxisButton, setAddAxisButton] = useState("btn btn-outline-info");

    const data = props.respo.graph;
    const stateName = props.respo.current.province;

    // Handle Graph Button Clicks
    const handleCasesGraphClick = () => {
      if(!casesGraph) {
        setCasesGraph("cases");
        setCasesGraphButton("btn btn-secondary");
      } else {
        setCasesGraph("");
        setCasesGraphButton("btn btn-outline-secondary");
      }
    };
    const handleDeathsGraphClick = () => {
      if(!deathsGraph) {
        setDeathsGraph("deaths");
        setDeathsGraphButton("btn btn-secondary");
      } else {
        setDeathsGraph("");
        setDeathsGraphButton("btn btn-outline-secondary");
      }
    };
    const handleVaccinationsGraphClick = () => {
      if(!vaccinationsGraph) {
        setVaccinationsGraph("vaccinationsCompleted");
        setVaccinationsGraphButton("btn btn-secondary");
      } else {
        setVaccinationsGraph("");
        setVaccinationsGraphButton("btn btn-outline-secondary");
      }
    };
    const handleNewCasesGraphClick = () => {
      if(!newCasesGraph) {
        setNewCasesGraph("newCases");
        setNewCasesGraphButton("btn btn-secondary");
      } else {
        setNewCasesGraph("");
        setNewCasesGraphButton("btn btn-outline-secondary");
      }
    };
    const handleNewDeathsGraphClick = () => {
      if(!newDeathsGraph) {
        setNewDeathsGraph("newDeaths");
        setNewDeathsGraphButton("btn btn-secondary");
      } else {
        setNewDeathsGraph("");
        setNewDeathsGraphButton("btn btn-outline-secondary");
      }
    };
    const handleAxisClick = () => {
      if(Axis === "left") {
        setAxis("right");
        setAddAxisButton("btn btn-info");
      } else if(Axis === "right") {
        setAxis("left");
        setAddAxisButton("btn btn-outline-info");
      }
    };   

    return (
        <div className="modal">

        <a className="close" onClick={props.close}>
            &times;
        </a>
        <div className="header"><strong> {stateName} </strong></div>
        <div className="content">
        <button className={casesGraphButton} onClick={handleCasesGraphClick}>Cases</button>
        <button className={deathsGraphButton} onClick={handleDeathsGraphClick}>Deaths</button>
        <button className={vaccinationsGraphButton} onClick={handleVaccinationsGraphClick}>Vaccinations</button>
        <button className={newCasesGraphButton} onClick={handleNewCasesGraphClick}>Daily New Cases</button>
        <button className={newDeathsGraphButton} onClick={handleNewDeathsGraphClick}>Daily New Deaths</button>
        <button className={addAxisButton} onClick={handleAxisClick}>Enable Separate Axis</button>
            <LineChart
                width={1000}
                height={400}
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
            <Line yAxisId={Axis} type="monotone" dataKey={deathsGraph} stroke="#82ca9d" />
            <Line yAxisId="left" connectNulls type="monotone" dataKey={vaccinationsGraph} stroke="#8884d8" />
            <Line yAxisId={Axis} type="monotone" dataKey={newCasesGraph} stroke="#F8F9AE" />
            <Line yAxisId={Axis} type="monotone" dataKey={newDeathsGraph} stroke="#9ffcc2" />
            </LineChart>
        </div>

        </div>
    );

};