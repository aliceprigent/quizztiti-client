import React, { Component } from "react";
import quizzHandler from "../../../api/quizzHandler";

export class MiniBox extends Component {
  state = {
    //index du quizz à updater
    _idParentQuizz: "",
    //index de la question à updater dans quizzTotal
    _idIndex: "",
  };

  componentDidMount() {
    const questId = this.props.match.params.id;
    console.log(questId);

    quizzHandler
      .getOneQuestion(questId)
      .then((res) => {
        console.log("res[0]:", res[0]);

        //   le quizz se trouve dans l'index 0 de l'array
        const questionsRecup = res[0].quizzTotal;
        console.log("questionsRecup", questionsRecup);
        //   extraction des index des questions du quizz pour trouver l'index de la question posée
        let arrayIndex = [];
        questionsRecup.forEach((question) => {
          arrayIndex.push(question._id);
        });

        //Extraction de la question à updater
        const questToUpdate = questionsRecup.filter((question) => {
          return question._id === questId;
        });
        //La question se trouve dans l'index 0 de questToUpdate
        console.log("questToUpdate:", questToUpdate[0]);
        //Print de l'index de la question à updater
        console.log("arrayIndex", arrayIndex.indexOf(questToUpdate[0]._id));
        this.setState(
          {
            _idParentQuizz: res[0]._id,
            _idIndex: arrayIndex.indexOf(questToUpdate[0]._id),
            index: questToUpdate[0].index,
            question: questToUpdate[0].question,
            proposition1: questToUpdate[0].propositions[0],
            proposition2: questToUpdate[0].propositions[1],
            proposition3: questToUpdate[0].propositions[2],
            proposition4: questToUpdate[0].propositions[3],
            answer: questToUpdate[0].answer,
            funFact: questToUpdate[0].funFact,
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    const key = event.target.name;
    const ev = event.target;
    this.setState({ [key]: ev.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let updatedQuest;
    // console.log(this.state)
    updatedQuest = {
      _idParentQuizz: this.state._idParentQuizz,
      _idIndex: this.state._idIndex,
      index: this.state.index,
      question: this.state.question,

      proposition1: this.state.proposition1,
      proposition2: this.state.proposition2,
      proposition3: this.state.proposition3,
      proposition4: this.state.proposition4,

      answer: this.state.answer,
      funFact: this.state.funFact,
    };
    console.log(updatedQuest);
    function buildFormData(formData, data, parentKey) {
      if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        Object.keys(data).forEach((key) => {
          buildFormData(
            formData,
            data[key],
            parentKey ? `${parentKey}[${key}]` : key
          );
        });
      } else {
        const value = data == null ? "" : data;

        formData.append(parentKey, value);
      }
    }

    function jsonToFormData(data) {
      const formData = new FormData();

      buildFormData(formData, data);

      return formData;
    }

    var objectFormData = jsonToFormData(updatedQuest);

    quizzHandler
      .updateOneQuestion(this.props.match.params.id, objectFormData)
      .then((res) => {
        console.log("ok updated");
        this.props.history.push(`/quizz/edit/${this.state._idParentQuizz}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form
          className="question-box center column"
          onChange={this.handleChange}
        >
          <label htmlFor="question">Question {this.state.index}/10</label>
          <input
            name="question"
            className="question column qbox"
            type="text"
            defaultValue={this.state.question}
          />

          <label htmlFor="proposition">Propositions</label>
          <div>
            <label htmlFor="proposition1">Proposition 1</label>
            <input
              type="text"
              name="proposition1"
              className="proposition column q-input"
              defaultValue={this.state.proposition1}
            />
            <div className="right-answer row">
              <input
                type="radio"
                name="answer"
                id="radio1"
                value={this.state.proposition1}
                className="qbox"
              />
              <label htmlFor="radio1" style={{ fontStyle: "italic" }}>
                This is the right answer
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="proposition 2">Proposition 2</label>
            <input
              type="text"
              name="proposition2"
              className="proposition column q-input"
              defaultValue={this.state.proposition2}
            />
            <div className="right-answer row">
              <input
                type="radio"
                name="answer"
                id="radio2"
                value={this.state.proposition2}
                className="qbox"
              />
              <label htmlFor="radio2" style={{ fontStyle: "italic" }}>
                This is the right answer
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="proposition 3">Proposition 3</label>
            <input
              type="text"
              name="proposition3"
              className="proposition column q-input"
              defaultValue={this.state.proposition3}
            />
            <div className="right-answer row">
              <input
                type="radio"
                name="answer"
                id="radio3"
                value={this.state.proposition3}
                className="qbox"
              />
              <label htmlFor="radio3" style={{ fontStyle: "italic" }}>
                This is the right answer
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="proposition4">Proposition 4 </label>
            <input
              type="text"
              name="proposition4"
              className="proposition column q-input"
              defaultValue={this.state.proposition4}
            />
            <div className="right-answer row">
              <input
                type="radio"
                name="answer"
                id="radio4"
                value={this.state.proposition4}
                className="qbox"
              />
              <label htmlFor="radio4" style={{ fontStyle: "italic" }}>
                This is the right answer
              </label>
            </div>
          </div>

          <label htmlFor="funFact">FunFact</label>
          <input name="funFact" type="text" defaultValue={this.state.funFact} className="q-input" />
          <button onClick={this.handleSubmit}>Validate Question</button>
        </form>
      </div>
    );
  }
}

export default MiniBox;
