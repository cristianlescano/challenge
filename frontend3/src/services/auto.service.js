import http from "../http-common";

class AutosDataService {
  getAll() {
    return http.get("/autos");
  }

  get(id) {
    return http.get(`/autos/${id}`);
  }

  create(data) {
    return http.post("/autos", data);
  }

  update(id, data) {
    return http.put(`/autos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/autos/${id}`);
  }
}

export default new AutosDataService();