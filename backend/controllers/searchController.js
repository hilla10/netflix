import User from '../models/User.js';
import { fetchFromTMDB } from '../services/tmdbService.js';

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`
    );

    if (!response || !response.results || response.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No person found for the query.',
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: 'person',
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log('Error searchPerson controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`
    );

    if (!response || !response.results || response.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No movie found for the query.',
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: 'movie',
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log('Error searchMovie controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`
    );

    if (!response || !response.results || response.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No tv found for the query.',
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: 'tv',
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log('Error searchTv controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log('Error getSearchHistory controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    if (!req.user?._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { searchHistory: { id } } },
      { new: true, projection: { searchHistory: 1 } }
    );

    res.status(200).json({ success: true, message: 'Search history removed.' });
  } catch (error) {
    console.log('Error removeItemFromSearchHistory controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
