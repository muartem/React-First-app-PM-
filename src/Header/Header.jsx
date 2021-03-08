import React from 'react';
import classnames from 'classnames';
import s from './Header.module.css';
import {Link} from "react-router-dom";

export default class Header extends React.Component{
   render(){
       return(
           <nav className={classnames("navbar navbar-expand-lg navbar-dark", s.bgmy)}>
               <div className={classnames("container-fluid", s.myContainer)} >
                   <Link className="navbar-brand" to="/">My first React multi app</Link>
                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"/>
                   </button>
                   <div className={classnames("collapse", "navbar-collapse", s.rout)} id="navbarNav">
                       <ul className="navbar-nav">
                           <li className="nav-item">
                               <Link className="nav-link" to="/whether">Whether</Link>
                           </li>
                           <li className="nav-item">
                               <Link className="nav-link" to="retro">Retrospective</Link>
                           </li>
                           <li className="nav-item">
                               <Link className="nav-link" to="todo">To-do list</Link>
                           </li>
                       </ul>
                   </div>
               </div>
           </nav>
        )
    }
}
