import React, { Component } from "react";
import MovieDataService from "../services/movie.service";
import {
  ArrowRight,
  PlayFill,
  Pencil,
  Trash,
  Play,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMovies = this.retrieveMovies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMovie = this.setActiveMovie.bind(this);
    this.removeAllMovies = this.removeAllMovies.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      movies: [],
      currentMovie: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveMovies();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveMovies() {
    MovieDataService.getAll()
      .then((response) => {
        this.setState({
          movies: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMovies();
    this.setState({
      currentMovie: null,
      currentIndex: -1,
    });
  }

  setActiveMovie(movie, index) {
    this.setState({
      currentMovie: movie,
      currentIndex: index,
    });
  }

  removeAllMovies() {
    MovieDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    MovieDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          movies: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteMovie(id) {
    MovieDataService.delete(id)
      .then((response) => {
        console.log(response.data);
        // this.props.history.push("/movies");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, movies, currentMovie, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <h4>Movies List</h4>

          <div className="row">
            {movies &&
              movies.map((movie, index) => (
                <div
                  className={
                    "col-md-3 col-sm-4 d-flex align-items-stretch " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMovie(movie, index)}
                  key={index}
                >
                  <div
                    class="card mb-3 mov-card col-lg-12"
                    style={{
                      backgroundImage: "url(" + movie.imagelink + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div class="movinside">
                      <div class="col-md-12 mt2">
                        <p></p>
                      </div>
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-4">
                            <Link to={"/movies/" + movie.id} className="">
                              <Pencil color="white" size={30} />
                            </Link>
                          </div>
                          <div class="col-md-4">
                            <Play color="white" size={50} />
                          </div>
                          <div class="col-md-4">
                            <Trash
                              color="white"
                              size={30}
                              onClick={() => {
                                this.deleteMovie(movie.id);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12 mt2">
                        <p class="card-text">{movie.description}</p>
                      </div>
                    </div>
                    <div class="card-body mt-3">
                      <h5 class="card-title">{movie.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
          </div>


        </div>


      </div>
    );
  }
}
