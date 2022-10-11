import './ErrorMessages.css'; 

function ErrorMessages({errorList}){
    return(
        <div className="container">
            <div className="errors">
            <ul>
                {errorList.map((s,k) => <li key={k}> {s} </li>)}
            </ul>
            </div>
        </div>
    )
}
export default ErrorMessages;