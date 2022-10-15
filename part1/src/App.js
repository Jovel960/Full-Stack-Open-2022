const Part = (props) => {
return (
  <>
  <p>{props.value}</p>
  </>
)
}

const Header = (props) => {
  return (
    <div>
      <Part value= {props.course} />
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part value= {props.partS[0]} />
      <Part value= {props.partS[1]} />
      <Part value= {props.partS[2]} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Sum of exercises : </p>
        <Part value = {props.sumOfEx} /> 
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    "Fundamentals of React",
    "Using props to pass data",
    "State of a component",
  ];
  const exercises = [10, 7, 14];

  console.log("Hello from App component");

  return (
    <div>
      <Header course={course} />
      <Content partS={parts} exerciseS={exercises} />
      <Total sumOfEx={exercises[0] + exercises[1] + exercises[2]} />
    </div>
  );
};

export default App;
