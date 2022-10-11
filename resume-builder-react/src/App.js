
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NavigationBar from './NavigationBar/NavigationBar';
import Homepage from './Homepage/Homepage';
import CreateAccount from './CreateAccount/CreateAccount';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavigationBar/>
      <Switch>
      <Route exact path="/">
          <Homepage/>
        </Route>
      <Route path="/create_account">
          <CreateAccount/>
        </Route>
        
        
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
