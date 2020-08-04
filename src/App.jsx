import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Quizz from "./pages/AllQuizz";
import FormNewTeam from "./components/Forms/FormNewTeam";
import Dashboard from "./pages/Dashboard"
import FormCreateQuizz from "./components/Forms/Quizz/FormCreateQuizz";
import DisplayQuizz from './pages/DisplayQuizz'
import TeamDashboard from "./components/Team/teamDashboard"
import Page404 from "./components/Page404"

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/:mode(signup|profile/edit)" component={Signup} />
        <Route path="/team/:mode(create|edit)/:id?" component={FormNewTeam} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/quizz" component={Quizz}/>
        <ProtectedRoute exact path="/quizz/new" component={FormCreateQuizz} />
        <Route
          exact
          path="/quizz/:id"
          component={DisplayQuizz}
        />
        <Route path="/dashboard" component={Dashboard} />        
        <Route path="/teams/:id" component={TeamDashboard} />
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
