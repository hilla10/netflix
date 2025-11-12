import { fetchFromTMDB } from '../services/tmdbService.js';

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US`
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.log('Error trendingMovie controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getMovieTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    if (!data || !data.results) {
      return res.status(404).json({
        success: false,
        message: 'No trailers found for this movie.',
      });
    }
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message?.includes('404')) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found.',
      });
    }
    console.log('Error getMovieTrailers controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No movie found for the id.',
      });
    }
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.log('Error getMovieDetails controller', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https:/api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No similar movie found for the id.',
      });
    }

    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    console.log('Error getSimilarMovies controller', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No  movie found for the category.',
      });
    }

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log('Error getMoviesByCategory controller', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
