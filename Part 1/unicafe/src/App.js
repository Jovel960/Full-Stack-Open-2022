import { useState } from "react";

const Button = ({ onClick, value }) => <button onClick={onClick}>{value}</button>;

const Statistics = ({
  goodStat,
  neutralStat,
  badStat,
  sumStat,
  avgStat,
  posStat,
}) => {
  //console.log(sumStat);
  if (!sumStat) {
    return <h3>No feedback given</h3>;
  } else {
    return (
      <div>
        <StatisticLine text='good' value={goodStat} />
        <StatisticLine text='neutral' value={neutralStat} />
        <StatisticLine text='bad' value={badStat} />
        <StatisticLine text='sum' value={sumStat} />
        <StatisticLine text='average' value={avgStat} />
        <StatisticLine text='positive' value={`${posStat} %`} />
      </div>
    );
  }
};

const StatisticLine = ({text, value}) => <h3>{text} {value}</h3>

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
      <div>
        <Statistics
          goodStat={good}
          neutralStat={neutral}
          badStat={bad}
          sumStat={sum}
          avgStat={avg}
          posStat={pos}
        />
      </div>
    </div>
  );
};

export default App;
