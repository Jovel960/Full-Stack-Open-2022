import Button from "./Button";
import { useState, useEffect } from "react";
import CountryClicked from "./CountryClicked";
import axios from "axios";
const Country = ({ countryinfo, num }) => {
  const [countryClicked, setCountryClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weather, setWeather] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  const [srcImg, setSrcImg] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;
  const countryLang = [];
  for (const [key, value] of Object.entries(countryinfo.languages)) {
    countryLang.push(value);
  }
  const weatherToKelvin = (kelvin) => kelvin - 273.15;
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${countryinfo.capital}&APPID=${api_key}`
      )
      .then((res) => {
        setWeather((Math.round(weatherToKelvin(res.data.main.temp)) * 10) / 10);
        setWindSpeed(res.data.wind.speed);
        setSrcImg(res.data.weather[0].icon)
        //console.log("1", res.data.weather[0].icon);
      })
      .catch((err) =>
        setErrorMessage("Weather is unavialible for this country")
      );
  }, []);
  const onClick = () => setCountryClicked(!countryClicked);
  //console.log(countryinfo);
  if (!num)
    return (
      <div>
        <p>
          {countryinfo.name.common} <Button onClick={onClick} />
        </p>
        <div>
          <CountryClicked countryinfo={countryinfo} flag={countryClicked} />
        </div>
      </div>
    );
  else {
    return (
      <div>
        <p style={{ fontWeight: "bold" }}>{countryinfo.name.common}</p>
        <div>
          <p style={{ fontWeight: "bold" }}>Capital : {countryinfo.capital}</p>
          <p style={{ fontWeight: "bold" }}> Area: {countryinfo.area}</p>
          <h3>Languages:</h3>
          <ul>
            {countryLang.map((lang, i) => (
              <li style={{ fontWeight: "bold" }} key={i}>
                {lang}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img src={`${countryinfo.flags.png}`} alt="Flag" />
        </div>
        <div>
          <div>
            {errorMessage === "" ? (
              <>
                <h3 style={{ fontWeight: "bold" }}>
                  Weatehr in {countryinfo.name.common}
                </h3>
                <p style={{ fontWeight: "bold" }}>
                  Temperature {weather} Celcius
                </p>
                <img src={`http://openweathermap.org/img/wn/${srcImg}@2x.png`} />
                <p style={{ fontWeight: "bold" }}>Wind {windSpeed} m/s</p>
              </>
            ) : (
              <>
                <p>{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};
export default Country;
