import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api/users",
  withCredentials: true,
});


function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}



export default {
  service,

  checkUsername(params) {
    return service.get("/", {params})
    .then((teamsJSON) => teamsJSON.data.length)
    .catch((err) => errorHandler(err));
  },

  getUsers(params) {
    return service.get("/", {
      params: params,
    });
  },

  getOneUser() {
    return service.get("/me");
  },


  updateOneUser(id, data) {
    return service.patch(`/${id}`, data);
  },

  deleteTeamInUser(obj) {
    // console.log("in apiUser", obj)
    return service.patch(`/delete-team`, obj)
  }
  ,

  updateUser(data) {
    return service.patch("/me", data);
  },

  manageUser(managedUserId) {
  return service.get('/manage',managedUserId)
}
};
