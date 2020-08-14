import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import NavMobile from "../components/NavMobile"

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section>
    <nav className="NavMain">
      <NavLink exact to="/">
        <img src="/media/icons8-année-du-singe-50.png" className="logo" alt="logo"/>
      </NavLink>

    
     

      {!context.isLoggedIn && (
        <ul className="nav-list">
          <React.Fragment>
            <li>
              <NavLink to="/signin">LOG IN</NavLink>
            </li>
            <li>
              <NavLink to="/signup">CREATE ACCOUNT</NavLink>
            </li>
          </React.Fragment>
          </ul>
        )}
    
        {context.isLoggedIn && (
         
          <React.Fragment>
          <ul className="nav-list">
          {/* Marie 
          ajout du lien vers Admin Dashboard*/}
          {context.user.isAdmin&&(
           
           <React.Fragment>
             <li>
               <NavLink to="/admin">
               Admin Dashboard
               </NavLink>
             </li>
           </React.Fragment>
      )}
            <li>
              <NavLink to="/dashboard">
                {context.user.name}
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">
                DASHBOARD
              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout}>LOGOUT</p>
            </li>
            </ul>
              <img src={context.user.image} className="avatar" alt="avatar"/>

              
             
          </React.Fragment>
          
        )}
        </nav>
        
        <NavMobile />
      
   
    </section>
  );
};

export default withUser(NavMain);
