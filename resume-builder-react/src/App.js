import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavigationBar from "./NavigationBar/NavigationBar";
import Homepage from "./Homepage/Homepage";
import CreateAccount from "./CreateAccount/CreateAccount";
import Login from "./Login/Login";
import { useState } from "react";
import AuthContext from "./AuthContext";
import PersonalWidgetDashboard from "./PersonalWidgetDashboard/PersonalWidgetDashboard";
import ViewResume from "./ViewResume/ViewResume";

function App() {
  const [loginInfo, setLoginInfo] = useState(null);

  return (
    <div className="App">
      <AuthContext.Provider value={loginInfo}>
        <BrowserRouter>
          <NavigationBar setLoginInfo={setLoginInfo} />
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/create_account">
              <CreateAccount />
            </Route>
            <Route exact path="/login">
              <Login setLoginInfo={setLoginInfo} />
            </Route>
            <Route exact path="/viewResume">
              <ViewResume/>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
