import http from "../http-common";

class ServicioDataService {
  getAll() {
    return http.get("/servicios");
  }
}

export default new ServicioDataService();