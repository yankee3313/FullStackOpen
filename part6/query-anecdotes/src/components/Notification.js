const Notification = ({ notifState}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {notifState}
    </div>
  )
}

export default Notification
