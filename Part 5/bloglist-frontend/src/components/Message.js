export function Message({message, type}) {
    if(type)
    {
        return(
        <span style={{marginBottom:"5px" ,display:"flex",padding:"10px",borderRadius:"5px",border:"5px solid green", backgroundColor:"lightgray", maxWidth:"max-content", color:"green", fontFamily:"sans-serif"}}>
            <p>{message}</p>
        </span>
    )
    }
    return (
        <span style={{marginBottom:"5px" ,display:"flex",padding:"10px",borderRadius:"5px",border:"5px solid red", backgroundColor:"lightgray", maxWidth:"max-content", color:"red", fontFamily:"sans-serif", fontWeight:"bold"}}>
            <p>{message}</p>
        </span>
    )
    
}