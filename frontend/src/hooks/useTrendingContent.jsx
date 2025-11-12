import { useEffect, useState } from 'react';
import useContentStore from '../store/content';
import api from '../api/axios';

const useTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();
  useEffect(() => {
    const getTrendingContent = async () => {
      const { data } = await api.get(`/${contentType}/trending`);
      setTrendingContent(data.content);
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useTrendingContent;
