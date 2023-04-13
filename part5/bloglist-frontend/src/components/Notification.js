const Notification = ({ success, error }) => {
    if (error === null && success === null) {
      return null
    } else if (error !== null){
      return (
        <div className="error">
          {error}
        </div>
      )
    } else if (success !== null){
      return (
        <div className="success">
          {success}
        </div>
      )
    } 
  
    
  }
  
  export default Notification