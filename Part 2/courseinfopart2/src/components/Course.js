import React from "react";
import Content from "./Content";
import Header from "./Header";
import Sum from "./Sum";

const Course = ({ parts, header }) => {
  //console.log(parts, header);
  return (
    <>
      <Header course={header} />
      {parts.map((part) => (
        <Content key={part.id} part={part} />
      ))}
      <Sum
        prop={`total of ${parts.reduce((s, e) => {
          return s + e.exercises;
        }, 0)} exercises`}
      />
    </>
  );
};

export default Course;
