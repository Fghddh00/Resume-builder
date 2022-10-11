import { Link } from "react-router-dom";
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

function Homepage() {
  
    return (
      <div  className="Homepage">
        <div className='createAccount'>
          <GridContainer>
            <Link size={Sizes.LARGE} to="/create_account" >
               <Button>Create Account </Button>
              </Link>
          </GridContainer>

        </div>
      </div>
    );
  
}

export default Homepage;
