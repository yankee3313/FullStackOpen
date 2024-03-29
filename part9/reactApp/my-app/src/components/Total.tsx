import { CoursePart } from './Types'

interface TotalProps {
  courseParts: CoursePart[];
}

const Total= ( props: TotalProps ) => {
  const totalExercises = props.courseParts.reduce((acc, item) => acc + item.exerciseCount, 0);

  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
