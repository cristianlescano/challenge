import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddAuto from "./components/add-auto.component";
import Auto from "./components/auto.component";
import AutosList from "./components/autos-list.component";

import AddPropietario from "./components/add-propietario.component";
import Propietario from "./components/propietario.component";
import PropietariosList from "./components/propietarios-list.component";

import ServiciosList from "./components/servicios-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/autos" className="navbar-brand">
            Challenge
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/autos"} className="nav-link">
                Autos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/propietarios"} className="nav-link">
                Propietarios
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/servicios"} className="nav-link">
                Tipos de servicios
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/autos"]} component={AutosList} />
            <Route exact path="/addAuto" component={AddAuto} />
            <Route path="/autos/:id" component={Auto} />

            <Route exact path="/propietarios" component={PropietariosList} />
            <Route exact path="/adddPropietario" component={AddPropietario} />
            <Route path="/propietarios/:id" component={Propietario} />
            
            <Route exact path="/servicios" component={ServiciosList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;