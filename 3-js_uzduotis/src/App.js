import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//   // 3 Užduotis. Javascript.
// Paimti iš https://api.meteo.lt Vilniaus oro sąlygas (užtenka conditionCode), jas atvaizduoti naudojant pasirinktas webfont ikoną. Įkoną priskirti pagal oro sąlygą. Po to reikšmę (conditionCode) su miesto pavadinimu ir data išsaugoti naršyklės atmintyje (localstorage arba cookies).
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState();
  const placeCode = "vilnius";
  const forecastType = "long-term";
  

  function Condition(param) {
    const conditions = [
      'clear',
      'isolated-clouds',
      'scattered-clouds',
      'overcast',
      'light-rain',
      'moderate-rain',
      'heavy-rain',
      'sleet',
      'light-snow',
      'moderate-snow',
      'heavy-snow',
      'fog',
      'na'
    ];
    const logos = [
      'fa-thin fa-sun',
      'fa-thin fa-sun',
      'fa-thin fa-cloud-sun',
      'fa-solid fa-cloud',
      'fa-thin fa-cloud-showers',
      'fa-thin fa-cloud-rain',
      'fa-thin fa-cloud-rain',
      'fa-regular fa-snowflakes',
      'fa-regular fa-snowflakes',
      'fa-regular fa-snowflakes',
      'fa-thin fa-fog',
      'fa-thin fa-sun',
    ];
    conditions.forEach((condition, i) => {
      if (condition[i] === param) {
        return logos[i];
      }
    });
  }


  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.meteo.lt/v1/places/${placeCode}/forecasts/${forecastType}`
      )
      .then((res) => setWeatherData(res.data))
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(weatherData));
  }, [weatherData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">API</h1>
        <ul>
          {weatherData?.forecastTimestamps.map(data => <li>{data.forecastTimeUtc} - <FontAwesomeIcon icon={'"'+ Condition(data.conditionCode) + '"'} />{data.conditionCode}</li>)}
        </ul>
      </header>
    </div>
  );
}
export default App;
