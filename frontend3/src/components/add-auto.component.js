import React, { Component } from "react";
import AutosDataService from "../services/auto.service";

export default class AddAuto extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveAuto = this.saveAuto.bind(this);
    this.newAuto = this.newAuto.bind(this);

    this.state = {
      id: null,
      marca: "",
      modelo: "",
      anio: "",
      color: "",
      patente: "",
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

  saveAuto() {
    var data = {
      marca: this.state.marca,
      modelo: this.state.modelo,
      anio: this.state.anio,
      patente: this.state.patente,
      color: this.state.color
    };

    AutosDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          marca: response.data.marca,
          modelo: response.data.modelo,
          anio: response.data.anio,
          patente: response.data.patente,
          color: response.data.color,
          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newAuto() {
    this.setState({
      id: null,
      marca: "",
      modelo: "",
      anio: "",
      patente: "",
      color: "",
      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newAuto}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Marca</label>
                <input
                  type="text"
                  className="form-control"
                  id="marca"
                  required
                  value={this.state.marca}
                  onChange={this.onChangeTitle}
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
                  value={this.state.modelo}
                  onChange={this.onChangeTitle}
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
                  value={this.state.anio}
                  onChange={this.onChangeTitle}
                  name="anio"
                />
              </div><div className="form-group">
                <label htmlFor="title">Patente</label>
                <input
                  type="patente"
                  className="form-control"
                  id="patente"
                  required
                  value={this.state.patente}
                  onChange={this.onChangeTitle}
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
                  value={this.state.color}
                  onChange={this.onChangeTitle}
                  name="color"
                />
              </div>
  
              <button onClick={this.saveAuto} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
}