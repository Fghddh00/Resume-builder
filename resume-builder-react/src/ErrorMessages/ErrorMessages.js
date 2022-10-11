function ErrorMessages({errorList}){
    return(
        <div className="container">
            <ul>
                {errorList.map((s,k) => <li key={k}> {s} </li>)}
            </ul>
        </div>
    )
}
export default ErrorMessages;