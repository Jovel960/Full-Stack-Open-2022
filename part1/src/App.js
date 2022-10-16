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
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1.name}
        part2={part2.name}
        part3={part3.name}
        exercise1={part1.exercises}
        exercise2={part2.exercises}
        exercise3={part3.exercises}
      />
      <Total sumOfEx={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
