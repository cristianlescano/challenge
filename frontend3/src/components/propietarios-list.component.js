import React, { Component } from "react";
import PropietarioDataService from "../services/propietario.service";
import { Link } from "react-router-dom";

export default class PropietariosList extends Component {
  constructor(props) {
    super(props);
    this.retrievePropietarios = this.retrievePropietarios.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePropietario = this.setActivePropietario.bind(this);

    this.state = {
      Propietarios: [],
      currentPropietario: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrievePropietarios();
  }

  retrievePropietarios() {
    PropietarioDataService.getAll()
      .then(response => {
        this.setState({
          Propietarios: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePropietarios();
    this.setState({
        currentPropietario: null,
      currentIndex: -1
    });
  }

  setActivePropietario(Propietario, index) {
    this.setState({
      currentPropietario: Propietario,
      currentIndex: index
    });
  }


  render() {
    const { Propietarios, currentPropietario, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Propietarios <Link to={"/addPropietario"} className="nav-link btnAdd">[+ añadir]</Link></h4>

          <table className="table">
            <tbody>
            {Propietarios &&
              Propietarios.map((Propietario, index) => (
                <tr
                  onClick={() => this.setActivePropietario(Propietario, index)}
                  key={index} 
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                >
                  <td className="td">{Propietario.nombre} </td>
                  <td className="td"> {Propietario.apellido} </td>
                  </tr>
              ))}
              </tbody>
          </table>

        </div>
        <div className="col-md-6">
          {currentPropietario ? (
            <div>
              <h4>Propietario</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentPropietario.nombre}
              </div>
              <div>
                <label>
                  <strong>Apellido:</strong>
                </label>{" "}
                {currentPropietario.apellido}
              </div>

              <Link
                to={"/propietarios/" + currentPropietario.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Propietario...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}