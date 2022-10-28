const Country = ({ countryinfo , num }) => {
    const countryLang = []
   for (const [key, value] of Object.entries(countryinfo.languages)) {
    countryLang.push(value);
   }
  //console.log(countryinfo);
  if (!num) return <p>{countryinfo.name.common}</p>;
  else {
    return (
      <div>
        <p style= { {fontWeight: 'bold'}}>{countryinfo.name.common}</p>
        <div>
            <p style= { {fontWeight: 'bold'}}>Capital : {countryinfo.capital}</p>
            <p style= { {fontWeight: 'bold'}}> Area: {countryinfo.area}</p>
            <h3>Languages:</h3>
            <ul>
                {countryLang.map((lang,i) => <li style={ {fontWeight: 'bold'}} key={i}>{lang}</li>)}
            </ul>
        </div>
        <div>
            <img src={`${countryinfo.flags.png}`} alt="Flag"/>
        </div>
      </div>
    );
  }
};

export default Country;
