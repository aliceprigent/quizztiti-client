import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/users",
  withCredentials: true,
});

export default {
  service,

  getUsers(params) {
    return service.get("/", {
      params: params,
    });
  },

  getOneUser() {
    return service.get("/me");
  },


  updateOneUser(id, data) {
    return service.patch(`/:${id}`, data);
  },

  deleteTeamInUser(obj) {
    console.log("in apiUser", obj)
    return service.patch(`/delete-team`, obj)
  }
  ,

  updateUser(data) {
    return service.patch("/me", data);
  },
};
