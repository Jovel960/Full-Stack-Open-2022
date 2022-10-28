const CountryClicked = ({ countryinfo, flag }) => {
  if (flag) {
    const countryLang = [];
    for (const [key, value] of Object.entries(countryinfo.languages)) {
      countryLang.push(value);
    }
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
      </div>
    );
  } else {
    return null;
  }
};

export default CountryClicked;
