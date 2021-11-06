import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./contexts/AuthContexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Qr from "./components/Qr";
import Checklist from "./components/Checklist";
import Booking from "./components/Booking";
import Visitor from "./components/Visitor";
import Order from "./components/Order";
import IndentOrder from "./components/IndentOrder";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component = {Dashboard} ></Route>
          <Route path="/login" component={Login}></Route>

          <Route path="/signup" component={Signup}></Route>
          <Route path="/qr" component={Qr}></Route>
          <Route path ="/profile" component = {Profile}></Route>
          <Route path ="/checklist" component = {Checklist}></Route>
          <Route path = "/booking" component = {Booking} ></Route>
          <Route path = "/visitor" component ={Visitor}></Route>
          <Route path ="/order" component = {Order} ></Route>
          <Route path = "/indentorder" component = {IndentOrder}></Route>

        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
