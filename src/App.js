import './App.css';

function Import() {

  return(
    <button id="import">Import</button>
  )
}

function App() {
  return (
    <div className="App">
      <div id="header-container">
        <h1 className="Header">dataset.csv</h1>
        <Import />
      </div>
      <div id="background-split">
      </div>
    </div>
  );
}

export default App;
