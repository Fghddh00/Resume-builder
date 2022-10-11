
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
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <TopBar>
      <TopBarLeft className="my-top-bar-right">
        <Menu>
          {/* make it have state so it can say log in or log out maybe*/}
          <Link to="/" > Home </Link>

            {/* Hidden while logged out */}
          <MenuItem isHidden>
            <a>View Resume</a>
          </MenuItem>


        </Menu>
      </TopBarLeft>

      <TopBarRight className="my-top-bar-right">
        <Menu>
          <MenuText>Build That Resume!!</MenuText>
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
