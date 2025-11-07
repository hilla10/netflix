import { Router } from 'express';
import {
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovie,
} from '../controllers/movieController.js';

const movieRouter = Router();

movieRouter.get('/trending', getTrendingMovie);
movieRouter.get('/:id/trailers', getMovieTrailers);
movieRouter.get('/:id/details', getMovieDetails);
movieRouter.get('/:id/similar', getSimilarMovies);
movieRouter.get('/:category', getMoviesByCategory);

export default movieRouter;
