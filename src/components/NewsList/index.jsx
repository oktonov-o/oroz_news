import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNews = () => {
      axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty').then((response) => {
        const latestStoryIds = response.data.slice(0, 100);
        const newsPromises = latestStoryIds.map((storyId) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
        );
  
        Promise.all(newsPromises).then((newsResponses) => {
          const newsData = newsResponses.map((newsResponse) => newsResponse.data);
          setNews(newsData);
          setIsLoading(false);
        });
      });
    };
  
    useEffect(() => {
      // Fetch news initially
      fetchNews();
  
      // Fetch news every minute (60,000 milliseconds)
      const intervalId = setInterval(fetchNews, 60000);
  
      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        fetchNews();
    };

  return (
    <div>
      <h1>All News</h1>
      <button onClick={handleRefresh}>Refresh</button>
      {isLoading
        ? <h2>Loading...</h2>
        : <ul>
            {news.map((item, index) => (
            <li key={item.id}>
                <p>{index}</p>
                <Link to={`/news/${item.id}`}>{item.title}</Link>
                <p>Score: {item.score}</p>
                <p>Author: {item.by}</p>
                <p>Date: {new Date(item.time * 1000).toLocaleDateString()}</p>
            </li>
            ))}
        </ul>
        }
    </div>
  );
};

export default NewsList;
