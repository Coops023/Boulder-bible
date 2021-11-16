import axios from "axios";

export class Users {
  constructor() {
    //baseUrl could be overwritten in the route that uses the API
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
    this.baseURL = `${baseUrl}/users`;
    this.api = axios.create({
      baseURL: this.baseURL,
    });
  }

  // // CHANGE THE PATHS ACCORDING TO API DOCUMENTATION
  getAll = () => this.api.get("/all-users");
  getOne = (id, storedToken) =>
    this.api.get(`/user/${id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  //   search = (query)=> this.api.get(`/search/?q=${query}`)
  createOne = (newEntityValues, storedToken) =>
    this.api.post("/signup", newEntityValues, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  login = (newEntityValues, storedToken) =>
    this.api.post("/login", newEntityValues, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  verifyToken = (storedToken) =>
    this.api.get("/verify", {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
}
