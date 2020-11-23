import React, { Component } from "react";
import MovieDataService from "../services/movie.service";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.onChangeImageLink = this.onChangeImageLink.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getMovie = this.getMovie.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);

    this.state = {
      currentMovie: {
        id: null,
        title: "",
        link: "",
        imagelink: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getMovie(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMovie: {
          ...prevState.currentMovie,
          title: title,
        },
      };
    });
  }

  onChangeImageLink(e) {
    const imagelink = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMovie: {
          ...prevState.currentMovie,
          imagelink: imagelink,
        },
      };
    });
  }

  onChangeLink(e) {
    const link = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMovie: {
          ...prevState.currentMovie,
          link: link,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentMovie: {
        ...prevState.currentMovie,
        description: description,
      },
    }));
  }

  getMovie(id) {
    MovieDataService.get(id)
      .then((response) => {
        this.setState({
          currentMovie: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentMovie.id,
      title: this.state.currentMovie.title,
      description: this.state.currentMovie.description,
      published: status,
    };

    MovieDataService.update(this.state.currentMovie.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentMovie: {
            ...prevState.currentMovie,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateMovie() {
    MovieDataService.update(this.state.currentMovie.id, this.state.currentMovie)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The movie was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteMovie() {
    MovieDataService.delete(this.state.currentMovie.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/movies");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentMovie } = this.state;

    return (
      <div>
        {currentMovie ? (
          <div className="edit-form">
            <h4>Movie</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMovie.title}
                  onChange={this.onChangeTitle}
                />
              </div>

              <div className="form-group">
                <label htmlFor="imagelink">Link Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="imagelink"
                  value={currentMovie.imagelink}
                  onChange={this.onChangeImageLink}
                />
              </div>

              <div className="form-group">
                <label htmlFor="link">Link Video</label>
                <input
                  type="text"
                  className="form-control"
                  id="link"
                  value={currentMovie.link}
                  onChange={this.onChangeLink}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentMovie.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              {/* <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMovie.published ? "Published" : "Pending"}
              </div> */}
            </form>

            {/* {currentMovie.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )} */}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMovie}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMovie}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Movie...</p>
          </div>
        )}
      </div>
    );
  }
}
