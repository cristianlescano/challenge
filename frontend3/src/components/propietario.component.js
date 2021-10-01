import React, { Component } from "react";
import PropietarioDataService from "../services/propietario.service";
import { Link } from "react-router-dom";

export default class Propietario extends Component {

  constructor(props) {
    super(props);
    this.changeTodo = this.onChangeTodo.bind(this);
    this.getPropietario = this.getPropietario.bind(this);
    this.updatePropietario = this.updatePropietario.bind(this);
    this.deletePropietario = this.deletePropietario.bind(this);

    this.state = {
      currentPropietario: {
        id: null,
        nombre: "",
        apellido: ""
      },
      message: ""
    };
  }
  

  componentDidMount() {
    this.getPropietario(this.props.match.params.id);
  }

  onChangeTodo(e){
    const key = e.target.name;
    const value = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPropietario: {
          ...prevState.currentPropietario,
          [key]: value
        }
      };
    });
  };

  getPropietario(id) {
    PropietarioDataService.get(id)
      .then(response => {
        this.setState({
          currentPropietario: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePropietario() {
    PropietarioDataService.update(
      this.state.currentPropietario.id,
      this.state.currentPropietario
    )
      .then(response => {
        this.setState({
          message: "The Propietario was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePropietario() {    
    PropietarioDataService.delete(this.state.currentPropietario.id)
      .then(response => {
        this.props.history.push('/propietarios')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPropietario } = this.state;

    return (
      <div>
        {currentPropietario ? (
          <div className="edit-form">
            <h4>Propietario</h4>
            <form>
            <div className="form-group">
                <label htmlFor="title">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  required
                  value={currentPropietario.nombre}
                  onChange={this.changeTodo}
                  name="nombre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  required
                  value={currentPropietario.apellido}
                  onChange={this.changeTodo}
                  name="apellido"
                />
              </div>
            </form>

            <Link
                to={"/propietarios"}
                className="badge badge-warning"
              >
              Volver
            </Link>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePropietario}
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePropietario}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Propietario...</p>
          </div>
        )}
      </div>
    );
  }
}