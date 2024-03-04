import './App.css';
import React, { useEffect, useState } from 'react';
import Bubble from "./components/bubblechart.js"
import MultiSeriesLineChart from './components/multiline.js';

const generateSampleData = () => {
  const seriesNames = ["Series 1", "Series 2", "Series 3"];
  const data = seriesNames.map(seriesName => ({
    name: seriesName,
    values: []
  }));

  for (let month = 0; month < 12; month++) {
    const date = new Date(2020, month, 1);
    data.forEach(series => {
      const value = Math.random() * 100;
      series.values.push({ date, value });
    });
  }

  return data;
};

const multiSeriesData = generateSampleData();

function SignIn() {

  return(
    <button id="sign-in">Log In</button>
  )
}

function MainText() {

  const [count, setCount] = useState(82192291);

  useEffect(() => {

    setInterval(() => {
    setCount(prev => prev + Math.floor(Math.random() * 4))

    }, 100)
  }, [])

  return (
    <>
      <div id="main-text">
        <h1 className="Header" id="number-sites">
        {count.toLocaleString()} 
        </h1>
        <h1 className="Header" id="sites-crawled">sites crawled</h1>
        <button id="learn-more">LEARN MORE</button>
      </div>
      <div id="main-subtext" data-aos="fade-left" data-aos-duration="1500">
        <h1 className="Header" id="question">What problem are we solving?</h1>
        <p className="pText" id="intro-p">
        Enable end-users to provide online sources and have them crawled unfiltered, analyzed, and provided with insights about people, places, events, factual claims and other trends over time.
        Enable comparative & unfiltered analysis across sources, across time, and against specified sets of baseline facts.
        </p>
      </div>
    </>
  )

}

function App() {

  return (
    <div className="App">
      <div id="header-container">
        <h1 className="Header">ITMATTER INC</h1>
        <h2 className="Header" id="dashboard">Dashboard</h2>
        <h2 className="Header" id="register">Register</h2>
        <SignIn />
      </div>
      <Bubble/>
      <MainText />
      <div id="background-split">
        <MultiSeriesLineChart data={multiSeriesData} width={1050} height={500} />
        <div id="secondary-info"> 
          <h1 className="Header" id="insights-header">What insights do we provide?</h1>
          <ul id="list-insights">
            <li>
              Content category classification: Politics, Sports, Entertainment, News, Financial News, Other
            </li>
            <li>
              Content sentiment classification: positive, negative, neutral
            </li>
            <li>
              Fact checking: comparing statement embeddings against an end-user defined baseline (true claims vs false claims)
            </li>
            <li>
              Content Summarization
            </li>
            <li>
              Entity and Entity Relation Extraction: knowledge graph creation
            </li>
            <li>
              Semantic triple extraction: graph traversal, term unification for derived knowledge
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
