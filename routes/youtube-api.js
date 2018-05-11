//Billyse example
const express = require ('express');
const mongoose = require ('mongoose');
const router = express.Router ();
const axios = require ('axios');
const User = require ('../models/user-model');

//  GET MOVIES

const moviesDb = axios.create ({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '3d60d443da666373611cdcdb9db60537',
    include_adult: false,
  },
});

// GET /:movieId
router.get ('/:movieId', (req, res, next) => {
  moviesDb
    .get (`/movie/${req.params.movieId}`)
    .then (movie => {
      if (!movie) {
        next ();
        return;
      }
      res.json (movie.data);
    })
    .catch (err => {
      next (err);
    });
});



// List of movies in home page sorted by vote_count.desc

router.get ('/movies', function (req, res, next) {
  moviesDb
    .get ('/discover/movie/', {
      params: {
        sort_by: 'vote_average.desc',
        sort_by: 'popularity.desc',
      },
    })
    .then (result => {
      console.log ('ca marche!!!!!! 🚀');
      res.json (result.data);
      // console.log (result.data);
    })
    .catch (err => {
      console.log ('WTF ERROR 🚧');
      // console.log (err);
      next (err);
    });
});

module.exports = router;