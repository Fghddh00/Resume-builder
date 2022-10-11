import {Link, useHistory} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Button } from 'react-foundation';

function Login(props){

    const history = useHistory();

    function loginHandler(e){

        e.preventDefault();

        //TODO: make these active inputs that update an object
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const loginRequest = {username, password};

        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(loginRequest)
        })
        .then( response => {
            if( response.status === 200 ){
                return response.json(); //if we had just returned the raw token, we would have to do .text()
            } else {
                //TODO: add Error component and display problem
                console.log( response );
            }
        } )
        .then( jwtContainer => {
            //what do we do here???
            //TODO: store token
            //TODO: decode token to get object of all claims
            //TODO: store the claims

            const jwt = jwtContainer.jwt_token;
            const claimsObject = jwtDecode( jwt );

            console.log( jwt );
            console.log( claimsObject );

            props.setLoginInfo({jwt, claims:claimsObject} );
            history.push("/");

        } )
        .catch( error => {
            console.log( error );
        });
    }

    return (
        <div className="container">
            <form onSubmit={loginHandler}>
                <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input id="username" name="username" className="form-control"/>
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="form-control"/>
                </div>

                <div className="text-right">
                    <Button className="btn btn-primary ">Log In</Button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;