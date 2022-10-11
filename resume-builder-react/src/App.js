import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavigationBar from "./NavigationBar/NavigationBar";
import Homepage from "./Homepage/Homepage";
import CreateAccount from "./CreateAccount/CreateAccount";
import Login from "./Login/Login";
import { useState } from "react";

function App() {

  const [loginInfo, setLoginInfo] = useState( null );

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/create_account">
            <CreateAccount />
          </Route>
          <Route exact path="/login">
            <Login setLoginInfo={setLoginInfo}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
