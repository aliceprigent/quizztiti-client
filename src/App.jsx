import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Quizz from "./pages/AllQuizz";
import FormNewTeam from "./components/Forms/Team/FormNewTeam"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/team/create" component={FormNewTeam} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/quizz" component={Quizz}/>
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
