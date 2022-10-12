import { Link } from "react-router-dom";
import { useContext } from "react";
import './Homepage.css';
import {
  Button,
  Grid,
  GridContainer,
  MediaObject,
  MediaObjectSection,
  Thumbnail,
  Sizes
} from "react-foundation";
import AuthContext from "../AuthContext";

function Homepage() {
  const loginInfo = useContext(AuthContext);
  
    return (
      <div  className="homepage">
        <div className='createAccount'>
          <GridContainer>
            {!loginInfo ? 
            <Link size={Sizes.LARGE} to="/create_account" >
               <Button>Create Account </Button>
              </Link>
              :
              <Link size={Sizes.LARGE} to="/addResume" >
               <Button>Add Resume </Button>
              </Link>
              }
          </GridContainer>

        </div>
      </div>
    );
  
}

export default Homepage;
