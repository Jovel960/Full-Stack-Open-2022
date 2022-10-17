import { useState } from "react";
const Display = ({counter}) => <div>{counter}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [counter, setCounter] = useState(0);
  const handleReset = () => setCounter(0);
  const handleClick = () => setCounter(counter + 1);
  const handleMinus = () => setCounter(counter - 1);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={handleClick} text="Click Me!" />
      <Button onClick={handleReset} text="Reset!" />
      <Button onClick={handleMinus} text="Minus by 1" />
    </div>
  );
};

export default App;
