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
      .get("api/quizz")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneQuizz(quizzId) {
    return service
      .get(`api/quizz/${quizzID}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },


updateQuizz(quizzID,newInfos){
   return service
    .patch(`api/quizz/${quizzID}`,newInfos)
    .then((res) => res.data)
    .catch(errorHandler);
},

createQuizz(newQuizz){
    return service
    .post("api/quizz",newQuizz)
    .then ((res)=>res.data)
    .catch(errorHandler)
},

deleteQuizz(quizzID){
    return service
    .delete(`api/quizz/${quizzID}`)
    .then((res) => res.data)
    .catch(errorHandler);
}

};