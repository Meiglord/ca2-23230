import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
//import required components
import CreateMovie from './CreateMovie';
import EditMovie from './EditMovie';
import MovieList from './MovieList';

// this is the "main" component which sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        {/*SERVERSIDE: Link the routes to components*/}
        <Route exact path="/" component={MovieList}/>
        {/*pass the id through the EditMovie component*/}
        <Route path="/edit-movie/:id" component={EditMovie}/>
        {/*set the path to create a new movie to CreateMovie component*/}
        <Route path="/create-movie" component={CreateMovie}/>
      </div>
    </HashRouter>
  );
};

export default App;
