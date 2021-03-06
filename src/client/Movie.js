import React from 'react';
import ReactDOM from 'react-dom';
//import the Link component to use for linking prop information
import { Link } from 'react-router-dom';

// define one single Movie card component
class Movie extends React.Component {
  render() {
    return (
      <div className="column is-2" style={{ padding: "20px" }}>
        <div className="card" style={{ borderRadius: "20px" }}>
          <div className="card-image">
            <figure className="image is-4by3">
              <img alt="Profile" src={this.props.image} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4 has-text-primary">{this.props.title}</p>
                <p>Duration : </p>
                <p className="title is-4 has-text-primary">{this.props.duration} mins</p>

                <hr/>
                <p className="subtitle is-size-6">{this.props.quote}</p>
                {/*delete the prop with requested id from the function invoked in the parent component*/}
                <button className="button is-danger" type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
                  Delete
                </button>
                {/*load the EditMovie component via React Router and send the id over to the EditMovie component*/}
                <Link to={`/edit-movie/${this.props.id}`}>
                  <button className="button is-primary" type="button">
                  Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
