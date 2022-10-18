import { useState } from "react";

const Button = ({ onClick, value }) => {
  return <button onClick={onClick}>{value}</button>;
};

const Statistics = ({
  goodStat,
  neutralStat,
  badStat,
  sumStat,
  avgStat,
  posStat,
}) => {
  return (
    <div>
      <h3 valueOfRecord={`bad ${goodStat} `}>{`good ${goodStat}`}</h3>
      <h3 valueOfRecord={`bad ${neutralStat} `}>{`neutral ${neutralStat}`}</h3>
      <h3 valueOfRecord={`bad ${badStat} `}>{`bad ${badStat}`}</h3>
      <h3 valueOfRecord={`sum ${sumStat} `}>{`sum ${sumStat}`}</h3>
      <h3 valueOfRecord={`avg ${avgStat} `}>{`average ${avgStat}`}</h3>
      <h3 valueOfRecord={`positive ${posStat} %`}>{`positive ${posStat} %`}</h3>
    </div>
  );
};

const App = () => {
  const [pos, setPositive] = useState(0);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [sum, setSum] = useState(0);
  const [avg, setAverage] = useState(0);

  const handleGoodClick = () => {
    const refSum = sum + 1;
    const refGood = good + 1;
    const refPositive = (refGood / refSum) * 100;
    const refAvg = (1 * refGood + 0 * neutral + -1 * bad) / refSum;
    setSum(refSum);
    setGood(refGood);
    setPositive(refPositive);
    setAverage(refAvg);
  };
  const handleNeutralClick = () => {
    const refSum = sum + 1;
    const refNeutral = neutral + 1;
    const refPositive = (good / refSum) * 100;
    const refAvg = (1 * good + 0 * refNeutral + -1 * bad) / refSum;
    setNeutral(neutral + 1);
    setSum(refSum);
    setPositive(refPositive);
    setAverage(refAvg);
  };
  const handleBadClick = () => {
    const refBad = bad + 1;
    const refSum = sum + 1;
    const refPositive = good / refSum;
    const refAvg = (1 * good + 0 * neutral + -1 * refBad) / refSum;
    setBad(bad + 1);
    setSum(sum + 1);
    setPositive(refPositive);
    setAverage(refAvg);
  };

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
      <Statistics
        goodStat={good}
        neutralStat={neutral}
        badStat={bad}
        sumStat={sum}
        avgStat={avg}
        posStat={pos}
      />
    </div>
  );
};

export default App;
