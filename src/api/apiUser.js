import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + '/users',
  withCredentials: true, 
});

export default {
    service,
  
    getUsers() {
      return service
        .get("/")
    },
  
    getOneUser() {
      return service
        .get("/me")
    },

    updateUser(data) {
        return service.patch("/me", data)
    }
  
  };
  