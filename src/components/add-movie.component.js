import React, { Component } from "react";
import MovieDataService from "../services/movie.service";

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.onChangeImageLink = this.onChangeImageLink.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.newMovie = this.newMovie.bind(this);

    this.state = {
      id: null,
      title: "",
      link: "",
      imagelink: "",
      description: "",
      published: false,
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value,
    });
  }

  onChangeImageLink(e) {
    this.setState({
      imagelink: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveMovie() {
    var data = {
      title: this.state.title,
      link: this.state.link,
      imagelink: this.state.imagelink,
      description: this.state.description,
    };

    MovieDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          link: response.data.link,
          imagelink: response.data.imagelink,
          description: response.data.description,
          published: response.data.published,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newMovie() {
    this.setState({
      id: null,
      title: "",
      link: "",
      imagelink: "",
      description: "",
      published: false,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMovie}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="imagelink">Image Link</label>
              <input
                type="text"
                className="form-control"
                id="imagelink"
                required
                value={this.state.imagelink}
                onChange={this.onChangeImageLink}
                name="imagelink"
              />
            </div>

            <div className="form-group">
              <label htmlFor="link">Link Video</label>
              <input
                type="text"
                className="form-control"
                id="link"
                required
                value={this.state.link}
                onChange={this.onChangeLink}
                name="link"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveMovie} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
