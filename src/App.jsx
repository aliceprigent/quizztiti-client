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
import TeamDashboard from './components/Team/teamDashboard'
import Page404 from "./components/Page404"
import FormEditQuizz from "./components/Forms/Quizz/FormEditQuizz";
import OneQuestionEdit from "./components/Forms/Quizz/OneQuestionEdit";
import QuizzCategories from "./components/Quizz/QuizzCategories"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faImages, faPlay, faEdit } from '@fortawesome/free-solid-svg-icons'
import AdminDash from "./components/Admin/AdminDash";
import MemberManagement from "./components/Admin/MemberManagement";


function App() {
  library.add(faImages,faPlay,faEdit)
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/:mode(signup|profile/edit)" component={Signup} />
        <ProtectedRoute exact path="/team/:mode(create|edit)/:id?" component={FormNewTeam} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/quizz" component={Quizz} />
        <ProtectedRoute exact path="/quizz/new" component={FormCreateQuizz} />
        <Route
          exact
          path="/quizz/:id"
          component={DisplayQuizz}
        />
        <ProtectedRoute exact path="/quizz/edit/yourQuizz" component={FormEditQuizz}/>
        <ProtectedRoute exact path="/question/:id" component={OneQuestionEdit}/>
        <ProtectedRoute path="/dashboard" component={Dashboard} />        
        <ProtectedRoute path="/teams/:id" component={TeamDashboard} />
        <ProtectedRoute exact path="/quizz/categories/:category" component={QuizzCategories} />
        <ProtectedRoute exact path="/admin" component={AdminDash}/>
        <ProtectedRoute exact path="/manage-member" component={MemberManagement}/>

        <Route path="*" component={Page404} />
      </Switch>
      
    </div>
  );
}

export default App;
