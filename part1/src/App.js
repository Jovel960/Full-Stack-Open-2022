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
  console.log(props.info);
  return (
    <div>
      <Part value={props.info[0].name} />
      <Part value={props.info[0].exercises} />
      <Part value={props.info[1].name} />
      <Part value={props.info[1].exercises} />
      <Part value={props.info[2].name} />
      <Part value={props.info[2].exercises} />
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
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content info={parts} />
      <Total
        sumOfEx={parts[0].exercises + parts[1].exercises + parts[2].exercises}
      />
    </div>
  );
};

export default App;
