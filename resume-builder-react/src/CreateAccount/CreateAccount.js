import { createContext, useState } from "react";
import { Button, Cell, Colors, Grid, GridContainer, InputTypes, Label } from "react-foundation";
import { Link, useHistory } from "react-router-dom";
import ErrorMessages from "../ErrorMessages/ErrorMessages";

function CreateAccount() {
    const history = useHistory();
    const [account, setAccount] = useState({});
    const [errors, setErrors] = useState([]);

    function handleSubmit( event ){
        event.preventDefault();

        fetch( "http://localhost:8080/create_account", {
            method: "POST",
            body: JSON.stringify(account)
            ,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
            if( response.status === 201 ){
                
                history.push( "/" );
                console.log(account);
               
                
            } else {
                setErrors(await response.json());
                console.log(errors);
                //Display error messages
                console.log(account);
            }
        });
    }

    function inputChangeHandler( inputChangedEvent ){
        

        const propertyName = inputChangedEvent.target.name;
        const newValue = inputChangedEvent.target.value;

        const accountCopy = {...account};

        
        accountCopy[propertyName] = newValue;

       
        setAccount( accountCopy );
    }

    

  return (
    <div>
      <h1>Create Account</h1>
      <GridContainer>
        
       <form onSubmit={handleSubmit}>
        <Grid>
          <Cell medium={5}>  
            <label htmlFor="firstName">First Name </label>
              <input className="half-form" type="text" placeholder="name"  name="firstName" onChange={inputChangeHandler}/>
          </Cell>
          <Cell medium={6} offsetOnMedium={1}>
            <label>  Last Name </label>
              <input className="half-form" type="text" placeholder="name" name="lastName" onChange={inputChangeHandler}/>
          </Cell>

          <Cell>
            <label>   Address
              <input type="text" placeholder="Street Address" name="streetAddress" onChange={inputChangeHandler}/>
              <input type="text" placeholder="Street Address Line 2" name="streetAddress2" onChange={inputChangeHandler}/>
            </label>
          </Cell>
          <Cell >
              <select name="state" size="1" onChange={inputChangeHandler}>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">Dist of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>      
          </Cell>
          <Cell medium={5}>    
              <input type="text" placeholder="City" name="city" onChange={inputChangeHandler}/> 
          </Cell>
          <Cell medium={6} offsetOnMedium={1}>
              <input type="number" placeholder="Postal/Zip Code" name="zipCode" onChange={inputChangeHandler}/> 
          </Cell>

          <Cell medium={5}>
            <label> Phone Number
              <input type="tel" placeholder="Phone number" name="phoneNumber" onChange={inputChangeHandler}/>
            </label>
          </Cell>

          <Cell >
            <label> Email
              <input type="text" placeholder="Email" name="email" onChange={inputChangeHandler}/>
            </label>
          </Cell>
        </Grid>
        <Grid >
            <Cell medium={6}>
            <label> Username
                <input type="text" placeholder="Username" name="username" onChange={inputChangeHandler}/>
            </label>
            <label> Password
                <input type="text" placeholder="Password" name="password" onChange={inputChangeHandler}/>
            </label>
            <label> Confirm Password
                <input type="text" placeholder="Confirm Password" name="confirmPassword" onChange={inputChangeHandler}/>
            </label>
            </Cell>
        </Grid>
        <div>
        <Button>Submit</Button> 
        <Button color={Colors.ALERT}>Cancel</Button> 
        </div>
        </form>
        <ErrorMessages errorList= {errors} />
      </GridContainer>

      <Link to="/login"> Already Have an account? Click here to login</Link>
    </div>
  );
}

export default CreateAccount;
