import './ErrorMessages.css';

function ErrorMessages({ errorList }) {
    return (
        // <div className="container">
        //     <div className="alert-box alert round">
        //     <ul>
        //         {errorList.map((s,k) => <li key={k}> {s} </li>)}
        //     </ul>
        //     </div>
        // </div>
        <div className="errors">
            <ul>
                {errorList.map(e => (
                    <li key={e}>{e}</li>
                ))}

            </ul>
        </div>
    )
}
export default ErrorMessages;