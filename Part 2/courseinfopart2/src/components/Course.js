import React from 'react'
import Content from './Content';
import Header from './Header';


const Course = ({parts, header}) => {
  console.log(parts, header)
    return (
      <>
      <Header course={header}/>
      {parts.map(part => <Content key={part.id} part={part} />)}
      </>
    )
  }

  export default Course;