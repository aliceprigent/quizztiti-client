import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
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

  displayAllQuizz() {
    return service
      .get("/quizz")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneQuizz(quizzId) {
    return service
      .get(`/quizz/${quizzId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

 
  updateQuizz(quizzID, newInfos) {
    return service
      .patch(`/quizz/${quizzID}`, newInfos)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createQuizz(newQuizz) {
    return service
      .post("/quizz/new", newQuizz)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteQuizz(quizzID) {
    return service
      .delete(`/quizz/${quizzID}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneQuestion(questId) {
    console.log(questId)
    return service
      .get(`/question/${questId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateOneQuestion(questId,params) {
      return service
      .patch(`/question/${questId}`,params)
      .then((res) => res.data)
      .catch(errorHandler);
  },

};
