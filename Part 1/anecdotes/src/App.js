import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [selected, setSelected] = useState(0);
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [arrVote, setArrVote] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState("");
  const [maxVote, setMaxVote] = useState(0);

  const handleNext = () => {
    const len = anecdotes.length;
    //console.log(len);
    const rand = Math.floor(Math.random() * len);
    setSelected(rand);
  };

  const handleVote = () => {
    const arr = [...arrVote];
    arr[selected] += 1;
    setArrVote(arr);
    const maxVoteRef = Math.max(...arr);
    const refAnecdote = arr.indexOf(maxVoteRef);
    console.log(refAnecdote)
    setMostVotedAnecdote(anecdotes[refAnecdote])
    setMaxVote(maxVoteRef)
  };

  return (
    <div>
      <h2>Anecdote of the day:</h2>
      <div>{anecdotes[selected]}</div>
      <div>Has {arrVote[selected]} votes</div>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNext} text="anecdote" />
      <div>
        <h2>Anecdote with most votes:</h2>
        <div>{mostVotedAnecdote}</div>
        <div>{!maxVote ? "No votes yet" : maxVote}</div>
      </div>
    </div>
  );
};

export default App;
