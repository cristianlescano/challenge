import React, { Component } from "react";
import AutosDataService from "../services/auto.service";
import { Link } from "react-router-dom";

export default class AutosList extends Component {
  constructor(props) {
    super(props);
    this.retrieveAutos = this.retrieveAutos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAuto = this.setActiveAuto.bind(this);

    this.state = {
      Autos: [],
      currentAuto: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveAutos();
  }

  retrieveAutos() {
    AutosDataService.getAll()
      .then(response => {
        this.setState({
          autos: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAutos();
    this.setState({
        currentAuto: null,
      currentIndex: -1
    });
  }

  setActiveAuto(auto, index) {
    this.setState({
      currentAuto: auto,
      currentIndex: index
    });
  }


  render() {
    const { autos, currentAuto, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Autos <Link to={"/addAuto"} className="nav-link btnAdd">[+ añadir]</Link></h4>

          <table className="table">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Propietario</th>
              </tr>
            </thead>
            <tbody>
            {autos &&
              autos.map((auto, index) => (
                <tr
                  onClick={() => this.setActiveAuto(auto, index)}
                  key={index} 
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                >
                  <td className="td"> {auto.patente} </td>
                  <td className="td"> {auto.propietario.nombre} {auto.propietario.apellido}</td>
                  </tr>
              ))}
              </tbody>
          </table>

        </div>
        <div className="col-md-6">
          {currentAuto ? (
            <div>
              <h4>Detalle:</h4>
              <div>
                <label>
                  <strong>Marca:</strong>
                </label>{" "}
                {currentAuto.marca}
              </div>
              <div>
                <label>
                  <strong>Modelo:</strong>
                </label>{" "}
                {currentAuto.modelo}
              </div>
              <div>
                <label>
                  <strong>Año:</strong>
                </label>{" "}
                {currentAuto.anio}
              </div>
              <div>
                <label>
                  <strong>Patente:</strong>
                </label>{" "}
                {currentAuto.patente}
              </div>
              <div>
                <label>
                  <strong>Color:</strong>
                </label>{" "}
                {currentAuto.color}
              </div>
              <div>
                <label>
                  <strong>Propietario:</strong>
                </label>{" "}
                {currentAuto.propietario.nombre} {currentAuto.propietario.apellido}
              </div>

              <Link
                to={"/autos/" + currentAuto.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              <Link
                to={"/addServicios/" + currentAuto.id}
                className="badge badge-warning"
              >
                Agregar servicios
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Auto...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}