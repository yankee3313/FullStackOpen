import Part from './Part'
import { CoursePart } from './Types'

interface ContentsProps {
  courseParts: CoursePart[];
}

const Contents = (props: ContentsProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <div key={index} style={{ lineHeight: '1' }}>
          <p style={{ lineHeight: '.1' }}><strong>{part.name} {part.exerciseCount}</strong></p>
          <Part courseParts={[part]}/>
        </div>
      ))}
    </div>
  );
};

export default Contents;
