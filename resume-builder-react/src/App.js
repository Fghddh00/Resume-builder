
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NavigationBar from './NavigationBar/NavigationBar';
import Homepage from './Homepage/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavigationBar/>
      <Switch>
        <Route exact path="/">
          <Homepage/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
