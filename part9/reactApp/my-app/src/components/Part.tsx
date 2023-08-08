import { CoursePart } from './Types'

interface PartsProps {
    courseParts: CoursePart[];
  }

function assertNever(value: never): never {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  }

const Part  = (props: PartsProps) => {
return (
    <div>
    {props.courseParts.map((part, index) => {
        switch (part.kind) {
        case 'basic':
            return (
            <div key={index} style={{ lineHeight: '.1', paddingBottom: '2px' }}>
                <p><em>{part.description}</em></p>
            </div>
            );
        case 'group':
            return (
            <div key={index} style={{ lineHeight: '.1', paddingBottom: '2px' }}>
                <p>Group Project Count: {part.groupProjectCount}</p>
            </div>
            );
        case 'background':
            return (
            <div key={index} style={{ lineHeight: '.1', paddingBottom: '2px' }}>
                <p ><em>{part.description}</em></p>
                <p>Background Material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
            </div>
            );
        default:
            return assertNever(part);
        }
    })}
    </div>
);
};

export default Part;