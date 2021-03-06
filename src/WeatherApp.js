import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
class WeatherService extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    }
  }

  componentDidMount() {
    const zip = this.props.zip;
    const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(apiURL)
      .then(res => res.json())
      .then(json => { this.setState({ weatherData: json }) })
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return (<div>Loading data...</div>);
    const weather = weatherData.weather[0];
    const iconURL = "http://api.openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      //<div>
      //  <h1>Hello from OpenweatherAPI!!!  </h1>
      //  <p>weather dor city with zipcode = {this.props.zip}</p>
      //</div>
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconURL} alt={weatherData.description} />
        </h1>
        {/*{ JSON.stringify(weatherData) }*/}
        <p>Current temp: {weatherData.main.temp}</p>
        <p>High temp: {weatherData.main.temp_max}</p>
        <p>Low temp: {weatherData.main.temp_min}</p>
        <p>Pressure: {weatherData.main.pressure} mb</p>
        <p>Humidity: {weatherData.main.humidity}</p>
        <p>Wind speed: {weatherData.wind.speed} m/s</p>
        <p>Wind direction: {weatherData.wind.deg}</p>
      </div>
    );
  }
}

const PLACES = [
  { name: "Washington", zip: "10203" },
  { name: "New York", zip: "20001" },
  { name: "Seattle", zip: "30001" },
  { name: "Las Vegas", zip: "40001" },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    }
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        {/*<p> Hello world from React.JS!!</p>*/}
        {
          PLACES.map((place, index) => (
            <button key={index}
              onClick={() => (
                //console.log(`Button ${index} cliked!!!`)
                this.setState({ activePlace: index })
              )}
              className={"button " + (index%2===0?"is-danger":"is-primary")}>
              {place.name}
            </button>
          ))
        }


        <WeatherService zip={PLACES[activePlace].zip} key={activePlace} />
      </div>
    );
  }
}

export default App;
