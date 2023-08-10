interface Props {
    errorMessage:string;
    }

const ErrorMessage = ({errorMessage}: Props) => {

    return (
        <div style={{color: 'red'}}>{errorMessage}</div>
    )
}

export default ErrorMessage