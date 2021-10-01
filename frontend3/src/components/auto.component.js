import React, { Component } from "react";
import AutosDataService from "../services/auto.service";
import { Link } from "react-router-dom";

export default class Auto extends Component {

  constructor(props) {
    super(props);
    this.changeTodo = this.onChangeTodo.bind(this);
    this.getAuto = this.getAuto.bind(this);
    this.updateAuto = this.updateAuto.bind(this);
    this.deleteAuto = this.deleteAuto.bind(this);

    this.state = {
      currentAuto: {
        id: null,
        marca: "",
        modelo: "",
        anio: "",
        color: "",
        patente: ""
      },
      message: ""
    };
  }
  

  componentDidMount() {
    this.getAuto(this.props.match.params.id);
  }

  onChangeTodo(e){
    const key = e.target.name;
    const value = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAuto: {
          ...prevState.currentAuto,
          [key]: value
        }
      };
    });
  };

  getAuto(id) {
    AutosDataService.get(id)
      .then(response => {
        this.setState({
          currentAuto: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAuto() {
    AutosDataService.update(
      this.state.currentAuto.id,
      this.state.currentAuto
    )
      .then(response => {
        this.setState({
          message: "The Auto was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAuto() {    
    AutosDataService.delete(this.state.currentAuto.id)
      .then(response => {
        this.props.history.push('/autos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAuto } = this.state;

    return (
      <div>
        {currentAuto ? (
          <div className="edit-form">
            <h4>Auto</h4>
            <form>
            <div className="form-group">
                <label htmlFor="title">Marca</label>
                <input
                  type="text"
                  className="form-control"
                  id="marca"
                  required
                  value={currentAuto.marca}
                  onChange={this.changeTodo}
                  name="marca"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  id="modelo"
                  required
                  value={currentAuto.modelo}
                  onChange={this.changeTodo}
                  name="modelo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Año</label>
                <input
                  type="anio"
                  className="form-control"
                  id="anio"
                  required
                  value={currentAuto.anio}
                  onChange={this.changeTodo}
                  name="anio"
                />
              </div><div className="form-group">
                <label htmlFor="title">Patente</label>
                <input
                  type="patente"
                  className="form-control"
                  id="patente"
                  required
                  value={currentAuto.patente}
                  onChange={this.changeTodo}
                  name="patente"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  required
                  value={currentAuto.color}
                  onChange={this.changeTodo}
                  name="color"
                />
              </div>

            </form>

            <Link
                to={"/autos"}
                className="badge badge-warning"
              >
              Volver
            </Link>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAuto}
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAuto}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Auto...</p>
          </div>
        )}
      </div>
    );
  }
}