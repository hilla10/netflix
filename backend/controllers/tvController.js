import { fetchFromTMDB } from '../services/tmdbService.js';

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ success: true, content: randomTv });
  } catch (error) {
    console.log('Error trendingTv controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getTvTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    if (!data || !data.results) {
      return res.status(404).json({
        success: false,
        message: 'No trailers found for this tv.',
      });
    }
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message?.includes('404')) {
      return res.status(404).json({
        success: false,
        message: 'Tv not found.',
      });
    }
    console.log('Error getTvTrailers controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No tv found for the id.',
      });
    }
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.log('Error getTvDetails controller', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getSimilarTvs = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https:/api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No similar tv found for the id.',
      });
    }

    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    console.log('Error getSimilarTvs controller', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getTvsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'No  tv found for the category.',
      });
    }

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log('Error getTvsByCategory controller', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
