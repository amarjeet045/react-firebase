import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./contexts/AuthContexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component = {Dashboard} ></Route>
          <Route path="/login" component={Login}></Route>

          <Route path="/signup" component={Signup}></Route>

        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
