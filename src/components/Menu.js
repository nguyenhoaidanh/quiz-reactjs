import React, { Component } from 'react';
import { Route, Link,NavLink } from 'react-router-dom';
import Login from "./Login";


const menus = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'IQ-Quiz',
        to: '/IQQuiz',
        exact: false
    },
     {
        name: 'Choice-Quiz',
        to: '/ChoiceQuiz',
        exact: false
    }
];

class Menu extends Component {
   constructor(props)
   {
       super(props);
       this.state={
           showModal:false,
           ShowBtn:true
       }
   }
   
    render() {
        var {showModal,ShowBtn}=this.state;
        var modal=<Login />;
       
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <a className="navbar-brand" href="#">ReactJS/NodeJS</a>
                    <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                             {this.showMenu(menus)}  
                        </ul>
                         {modal} 
                       
                        
                    </div>
                </nav>
                
            </div>
        );
    }
  
    showMenu = (menus) => {
        var result = null;
        result = menus.map((e, index) => {
            return <li className="nav-item active"><NavLink className="nav-link" to={e.to}  key={index} >{e.name}</NavLink></li>
        })
        return result;
    }
}

export default Menu;
