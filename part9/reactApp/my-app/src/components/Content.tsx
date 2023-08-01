import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentsProps {
  courseParts: CoursePart[];
}

const Contents = (props: ContentsProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Contents;
