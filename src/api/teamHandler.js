import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL +"/api",
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
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

  getAllTeams() {
    return service
      .get("/teams")
      .then((teamsJSON) => teamsJSON.data)
      .catch((err) => errorHandler(err));
  },

  create(obj) {
    return service
      .post(`/teams`, obj)
      .then((teamJSON) => teamJSON.data)
      .catch((err) => errorHandler(err));
  },

  getOneTeam(id) {
    return service
      .get(`/teams/${id}`)
      .then((teamJSON) => teamJSON.data)
      .catch((err) => errorHandler(err));
  },

  updateOneTeam(id, obj) {
    return service
      .patch(`/teams/${id}`, obj)
      // .then((updTeamJSON) => console.log("update successful, updated team : ", updTeamJSON.data))
      .catch((err) => errorHandler(err));
  },


  updateTeamQuizzes(id, obj) {
    return service
      .patch(`teams/${id}/quizzes`, obj)
      .then((updTeamJSON) => updTeamJSON.data)
      .catch((err) => errorHandler(err));
  },

  deleteTeam(id) {
    return service
      .delete(`/teams/${id}`)
      .then((deletion) => console.log(`deletion in frontend OK - ${deletion}`))
      .catch((err) => errorHandler(err));
  },
};
