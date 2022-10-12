import { Link, useHistory} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Button,Colors } from 'react-foundation';
import { useState } from 'react';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

function Login(props){

    const history = useHistory();
    const [errors, setErrors] = useState([]);

    function loginHandler(e){

        e.preventDefault();

        //TODO: make these active inputs that update an object
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const loginRequest = {username, password};

        fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(loginRequest)
        })
        .then( async response => {
            if( response.status === 200 ){
                return response.json(); 
            }else if(response.status === 403){ 
                setErrors(["Username/Password incorrect"]);
            } else {
               
                console.log("fail")
                setErrors( await response.json() );
            }
        } )
        .then( jwtContainer => {
            

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

                <div >
                    <Button >Log In</Button>
                    <Link to="/">
                        <Button color={Colors.ALERT}>Cancel</Button> 
                    </Link>
                </div>
            </form>
            <Link to="/create_account"> Create an account</Link>
            <ErrorMessages errorList= {errors} />
        </div>
    );
}

export default Login;