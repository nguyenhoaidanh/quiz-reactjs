import React, { Component } from 'react';
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import routes from "./../routes";
import Menu from "./Menu";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Menu />
                    <div className="container">
                        <div className="row">
                            {this.showContentMenus(routes)}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }

    showContentMenus = (routes) => {
        var result = null;
        result = routes.map((route, index) => {
            return (<Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />)
        });
     
        return <Switch>{result}</Switch>;
    }
}

export default App;