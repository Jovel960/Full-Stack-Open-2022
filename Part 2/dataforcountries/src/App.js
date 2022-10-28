import { useState, useEffect } from "react";
import axios from "axios";
import Input from "./components/Input";
import Country from "./components/Country";
const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountryList(res.data));
  }, []);
  const onSearch = (event) => {
    if (event.target.value === " ") setFilter(false);
    else {
      setFilter(true);
      setSearch(event.target.value);
    }
  };

  const countriesList = filter 
    ? countryList.filter((country) => {
        return country.name.common.includes(search);
      })
    : null ;

  return (
    <div>
      <Input onSearch={onSearch} search={search} />
      {filter ? (
        countriesList.length === 0 ? (
          <h3>No match</h3>
        ) : countriesList.length > 10 ? (
          <h3>Too many matches, specify another filter...</h3>
        ) : countriesList.length < 10 && countriesList.length > 1 ? (
          countriesList.map((country, i) => (
            <Country countryinfo={country} key={i} num={false} />
          ))
        ) : (
          <Country countryinfo={countriesList[0]} num={true} />
        )
      ) : (
        <h3>Search for any country</h3>
      )}
    </div>
  );
};

export default App;
