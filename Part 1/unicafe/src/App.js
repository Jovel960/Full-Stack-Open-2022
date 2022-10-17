import { useState } from "react";

const Button = ({ onClick, value }) => {
  return <button onClick={onClick}>{value}</button>;
};

const Display = ({ valueOfRecord }) => {
  //console.log(valueOfRecord);
  return <h3>{valueOfRecord}</h3>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
      </div>
      <div>
        <Button onClick={handleGoodClick} value="good" />
        <Button onClick={handleNeutralClick} value="neutral" />
        <Button onClick={handleBadClick} value="bad" />
      </div>
      <div>
        <h1>Statistics</h1>
      </div>
      <div>
        <Display valueOfRecord={`good ${good}`}  />
        <Display valueOfRecord={`neutral ${neutral}` }  />
        <Display valueOfRecord={`bad ${bad} `}  />
      </div>
    </div>
  );
};

export default App;
