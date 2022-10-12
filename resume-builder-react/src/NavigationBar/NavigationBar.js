
import { useContext } from "react";
import {
  
  TopBar,
  Menu,
  TopBarLeft,
  TopBarRight,
  MenuItem,
  MenuText,
  ResponsiveNavigation,
  GridContainer,
  Grid,
  Sizes,
  Button,
} from "react-foundation";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";

function NavigationBar(props) {
  const loginInfo = useContext(AuthContext);
  const history = useHistory();

  function logoutHandler(){
        props.setLoginInfo(null);
        history.push( "/" );
      }

  return (
    <TopBar>
      <TopBarLeft className="my-top-bar-right">
        <Menu>
          {/* make it have state so it can say log in or log out maybe*/}
          <Link to="/" > Home </Link>

           {loginInfo ? 
          <MenuItem >
            <Link to="/viewResume">View Resume</Link>
          </MenuItem>
          : null
          }


        </Menu>
      </TopBarLeft>

      <TopBarRight className="my-top-bar-right">
      
        <Menu>
        {loginInfo ? <Button onClick={logoutHandler} className="btn btn-outline-success my-2 my-sm-0">Log Out {loginInfo.claims.sub}</Button> :
                    <Link className="btn btn-outline-success my-2 my-sm-0" to="/login" >Log In</Link>}
          <MenuItem>
            <a href="https://www.linkedin.com/company/genesis10/" >LinkedIn</a>
          </MenuItem>
          <MenuItem>
            <a href="https://www.facebook.com/Genesis10Page">FB</a>
          </MenuItem>
          <MenuItem>
            <a href="https://twitter.com/Genesis10Corp">Twitter</a>
          </MenuItem>
        </Menu>
      </TopBarRight>
    </TopBar>
  );
}

export default NavigationBar;
