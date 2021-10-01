import React, { Component } from "react";
import ServicioDataService from "../services/servicio.service";

export default class ServiciosList extends Component {
  constructor(props) {
    super(props);
    this.retrieveServicios = this.retrieveServicios.bind(this);
    this.refreshList = this.refreshList.bind(this);
    //this.setActiveServicio = this.setActiveServicio.bind(this);

    this.state = {
      Servicios: [],
      currentServicio: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveServicios();
  }

  retrieveServicios() {
    ServicioDataService.getAll()
      .then(response => {
        this.setState({
          Servicios: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveServicios();
    this.setState({
        currentServicio: null,
      currentIndex: -1
    });
  }


  render() {
    const { Servicios, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <h4>Servicios</h4>

          <table className="table">
            <tbody>
            {Servicios &&
              Servicios.map((servicio, index) => (
                <tr
                  key={index} 
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                >
                  <td className="td">{servicio.nombre} </td>
                  <td className="td"> {servicio.costo} </td>
                  </tr>
              ))}
              </tbody>
          </table>

        </div>
      </div>
    );
  }
}