import http from "../http-common";

class PropietarioDataService {
  getAll() {
    return http.get("/propietarios");
  }

  get(id) {
    return http.get(`/propietarios/${id}`);
  }

  create(data) {
    return http.post("/propietarios", data);
  }

  update(id, data) {
    return http.put(`/propietarios/${id}`, data);
  }

  delete(id) {
    return http.delete(`/propietarios/${id}`);
  }
}

export default new PropietarioDataService();