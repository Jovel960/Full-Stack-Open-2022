const Notification = ({message, flag}) =>{
    if(flag){
    return (
        message ? 
        <h2 className="successMessage">{message}</h2> : null
    )
    }
    else {
        return (
             message ? 
        <h2 className="errorMessage">{message}</h2> : null
        )
    }
}

export default Notification;