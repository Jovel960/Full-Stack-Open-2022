const Part = (props) => {
  console.log(props.value);
  return (
    <div>
      <p>{props.value}</p>
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <Part value={props.course} />
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part value={props.part1} />
      <Part value={props.exercise1} />
      <Part value={props.part2} />
      <Part value={props.exercise2} />
      <Part value={props.part3} />
      <Part value={props.exercise3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Sum of exercises : </p>
      <Part value={props.sumOfEx} />
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content
        part1={parts[0].name}
        part2={parts[1].name}
        part3={parts[2].name}
        exercise1={parts[0].exercises}
        exercise2={parts[1].exercises}
        exercise3={parts[2].exercises}
      />
      <Total sumOfEx={parts[0].exercises+parts[1].exercises+parts[2].exercises} />
    </div>
  );
};

export default App;
