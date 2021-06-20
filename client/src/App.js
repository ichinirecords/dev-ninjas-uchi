import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Upload from "./pages/Upload";
import Edit from "./pages/Edit";

const App = () => {
	const [user, setUser] = useState("");
	return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/about/this/site">
        <About />
      </Route>
      <Route exact path="/login">
        <AdminLogin setUser={setUser} />
      </Route>
      <Route exact path="/admin">
        <AdminPanel user={user} setUser={setUser} />
      </Route>
      <Route exact path="/edit">
        <Edit user={user} setUser={setUser} />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
    </Switch>
  );
};

export default App;
