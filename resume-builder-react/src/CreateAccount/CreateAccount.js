import { Button, Cell, Colors, Grid, GridContainer, InputTypes, Label } from "react-foundation";
import { Link } from "react-router-dom";

function CreateAccount() {
  return (
    <div>
      <h1>Create Account</h1>
      <GridContainer>
        <Grid>
          <Cell medium={5}>  
            <label>First Name
              <input className="half-form" type="text" placeholder="name" />
            </label>
          </Cell>
          <Cell medium={6} offsetOnMedium={1}>
            <label>  Last Name
              <input className="half-form" type="text" placeholder="name" />
            </label>
          </Cell>

          <Cell>
            <label>   Address
              <input type="text" placeholder="Street Address" />
              <input type="text" placeholder="Street Address Line 2" />
            </label>
          </Cell>
          <Cell >
              <select name="state" size="1">
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
              <input type="text" placeholder="City" /> 
          </Cell>
          <Cell medium={6} offsetOnMedium={1}>
              <input type="number" placeholder="Postal/Zip Code" /> 
          </Cell>

          <Cell medium={5}>
            <label> Phone Number
              <input type="tel" placeholder="Phone number" />
            </label>
          </Cell>

          <Cell >
            <label> Email
              <input type="text" placeholder="Email" />
            </label>
          </Cell>
        </Grid>
        <Grid >
            <Cell medium={6}>
            <label> Password
                <input type="text" placeholder="Password" />
            </label>
            <label> Confirm Password
                <input type="text" placeholder="Confirm Password" />
            </label>
            </Cell>
        </Grid>
        <div>
        <Button>Submit</Button> 
        <Button color={Colors.ALERT}>Cancel</Button> 
        </div>

      </GridContainer>

      <Link to="/login"> Already Have an account? Click here to login</Link>
    </div>
  );
}

export default CreateAccount;
