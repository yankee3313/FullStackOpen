const Course = ({course}) => {
  const total = course.parts.reduce((sum,x) => 
    sum + x.exercises, 0)
    return (
      <>
      <h1 key = {course.id}>{course.name}</h1>
        {course.parts.map((x) => 
          <li key ={x.id}>
            {x.name} {x.exercises}
            </li>
        )}
      <div>total of {total} exercises</div>
      </>
    )
  }
  
  export default Course