import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import AdminLogin from './pages/AdminLogin';
import AdminPanel from "./pages/AdminPanel";


const App = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/about/this/site">
      <About />
    </Route>
    <Route exact path="/login">
      <AdminLogin />
    </Route>
    <Route exact path="/admin">
      <AdminPanel />
    </Route>
  </Switch>
);

export default App;
