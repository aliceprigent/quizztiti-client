import React, { Component } from "react";
import QuestionBox from "../../Forms/Quizz/QuestionBox";
import quizzHandler from "../../../api/quizzHandler";
import MiniBox from "./MiniBox";
import UserContext from "../../Auth/UserContext";
import { withUser } from "../../Auth/withUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class FormEditQuizz extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    // this.handleClick=this.fileInput.bind(this)
  }
  state = {
    image: "",
    isPublished: "",
  };

  componentDidMount() {
    const quizzId = this.props.location.state;
    // console.log(quizzId);
    quizzHandler
      .getOneQuizz(quizzId)
      .then((data) => {
        console.log(data);
        this.setState(
          {
            title: data.title,
            thema: data.thema,
            status: data.status,
            image: data.image,
            quizzTotal: data.quizzTotal,
            creator: data.creator,
            isPublished: data.isPublished,
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
    let value;

    event.target.type === "select"
      ? (value = event.target.selected)
      : (value = event.target.value);

    this.setState({ [key]: value });
    // console.log(this.state);
  };

  handleImage = (event) => {
    this.setState({
      image: event.target.files[0],
      tmpImage: URL.createObjectURL(event.target.files[0]),
      // },
      // () => {
      //   console.log(this.state.image);
    });
  };

  handleSubmit = (event) => {
    // const quizzId = this.props.match.params.id;
    event.preventDefault();
    // console.log("submit:", this.state);
    var updQuizzData = {
      title: this.state.title,
      thema: this.state.thema,
      status: this.state.status,
      image: this.state.image,
      isPublished: this.state.isPublished,
    };

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

    var updquizzFormData = jsonToFormData(updQuizzData);
    var quizzId = this.props.location.state;
    console.log(updQuizzData);

    quizzHandler
      .updateQuizz(quizzId, updquizzFormData)
      .then((data) => {
        console.log(data);
        if (this.props.context.user.isAdmin === true) {
          this.props.history.push("/admin");
        } else {
          this.props.history.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (event) => {
    quizzHandler
      .deleteQuizz(this.props.location.state)
      .then((data) => {
        // console.log(data)
        if (this.props.context.user.isAdmin === true) {
          this.props.history.push("/admin");
        } else {
          this.props.history.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChecked = (event) => {
    this.setState({ isPublished: !this.state.isPublished }, () => {
      console.log("check verif", this.state);
    });
  };

  render() {
    if (this.state === null) {
      return <div>...Loading</div>;
    }
    console.log(this.props.location.state);
    console.log("creator", this.state.creator);

    if (
      !this.state.creator === this.props.context.user._id ||
      this.props.context.user.isAdmin === "false"
    ) {
      this.props.history.push("/dashboard");
    }
    return (
      <div className="column center">
        <h1 className="title">Your quizz infos</h1>
        <section className="column center">
          <section
            className="column center"
            style={{ marginTop: "40px", width: "100%" }}
          >
            <form
              className="column center"
              style={{
                backgroundColor: "var(--grey)",
                width: "40%",
                borderRadius: "20px",
              }}
              onSubmit={this.handleSubmit}
            >
              <label
                style={{ margin: "10px" }}
                htmlFor="title"
                className="quizz-label"
                style={{ margin: "10px" }}
              >
                Title :
              </label>
              <input
                type="text"
                name="title"
                className="title sign-input"
                placeholder="Short description of your quizz"
                maxLength="120"
                defaultValue={this.state.title}
                onChange={this.handleChange}
                style={{
                  margin: "0px",
                  border: "1px solid grey",
                  textAlign: "left",
                  width: "70%",
                  backgroundColor: "white",
                }}
              />
              <label
                style={{ margin: "10px" }}
                htmlFor="thema"
                className="quizz-label"                
              >
                Topic :
              </label>
              <select
                name="thema"
                className="quizz-select"
                onChange={this.handleChange}
                // defaultValue={this.state.thema}
                value={this.state.thema}
                style={{ width: "30%" }}
              >
                <option value=""></option>
                <option value="Nature">Nature</option>
                <option value="General">General</option>
                <option value="Health">Health</option>
                <option value="Celebrity">Celebrity</option>
                <option value="Society">Society</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>

              <label
                style={{ margin: "10px" }}
                htmlFor="status"
                className="status"
                
              >
                Status :
              </label>
              <select
                name="status"
                className="quizz-status"
                onChange={this.handleChange}
                value={this.state.status}
                style={{ width: "30%" }}
              >
                <option value=""></option>
                <option value="Public" defaultValue>
                  Public
                </option>

                <option value="Private">Private</option>
              </select>

              <div className="img-download center column ">
            <label htmlFor="image" style={{ margin: "10px" }}>Customize your quizz picture</label>
            <FontAwesomeIcon
              icon="images"
              size="4x"
              className="icon"
              onClick={this.handleClick}
            />
            <input
              type="file"
              name="image"
              id="quizz-image"
              onChange={this.handleImage}
              ref={this.fileInput}
              style={{ display: "none" }}
            />
          </div>
              <img
                className="quizz-image"
                src={
                  this.state.tmpImage ? this.state.tmpImage : this.state.image
                }
                alt="Your chosen"
                style={{ margin: "20px" }}
              />

              {this.props.context.user.isAdmin === true && (
                <div className="toggle column center space around" style={{margin:"0px auto 20px"}}>

                <label className="quizz-label" style={{ margin: "10px"}}>Publish on App:</label>
                  <label class="switch">
                    <input
                      type="checkbox"
                      name="isPublished"
                      onChange={this.handleChecked}
                      checked={this.state.isPublished}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              )}

              <div className="form-validation" >
                <button style={{ margin: "10px" }} className="btn">
                  Edit
                </button>{" "}
                <button
                  className="quizz-delete btn"
                  style={{ width: "150px", margin: "10px" }}
                  onClick={this.handleDelete}
                >
                  Delete Quizz
                </button>
                <br />
                <span style={{ color: "red" }}>{this.state.errors}</span>
              </div>
            </form>
          </section>
          <section className="row wrap center" style={{ margin: "20px" }}>
            {this.state.quizzTotal &&
              this.state.quizzTotal.map((question) => {
                return <MiniBox question={question} key={question._id} />;
              })}
          </section>
        </section>
      </div>
    );
  }
}

export default withUser(FormEditQuizz);
