import React, { Component } from "react";
import PropietariosDataService from "../services/propietario.service";

export default class AddPropietario extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.savePropietario = this.savePropietario.bind(this);
    this.newPropietario = this.newPropietario.bind(this);

    this.state = {
      id: null,
      nombre: "",
      apellido: "",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  savePropietario() {
    var data = {
      nombre: this.state.nombre,
      apellido: this.state.apellido
    };

    PropietariosDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPropietario() {
    this.setState({
      id: null,
      nombre: "",
      apellido: "",
      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newPropietario}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  required
                  value={this.state.nombre}
                  onChange={this.onChangeTitle}
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
                  value={this.state.apellido}
                  onChange={this.onChangeTitle}
                  name="apellido"
                />
              </div>
  
              <button onClick={this.savePropietario} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
}