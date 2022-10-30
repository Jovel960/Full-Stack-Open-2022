const Notification = ({message}) =>{
    return (
        message ? 
        <h2 className="successMessage">{message}</h2> : null
    )
}

export default Notification;