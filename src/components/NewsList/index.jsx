import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';
import { Button, List, ListItem, ListItemText } from '@mui/material'


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
      fetchNews();
      const intervalId = setInterval(fetchNews, 60000);
      return () => clearInterval(intervalId);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        fetchNews();
    };

  return (
    <div className='allNewsContainer'>
      <h1>All News</h1>
      <Button variant="contained" onClick={handleRefresh}>Refresh</Button>
      {isLoading
        ? <h2>Loading...</h2>
        : <List>
            {news.map((item) => (
              <Link to={`/news/${item.id}`} key={item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem
                  sx={{
                    border: '1px solid #ccc',
                    marginBottom: '10px', // Adjust the spacing as needed
                    padding: '10px', // Adjust the padding as needed
                    borderRadius: '10px', // Adjust the border radius as needed
                    '&:hover': {
                      backgroundColor: '#f0f0f0', // Adjust the hover background color as needed
                    }
                  }}>
                  <ListItemText
                    primary={item.title}
                    secondary={`Author: ${item.by} | Score: ${item.score} | Date: ${new Date(item.time * 1000).toLocaleDateString()}`}
                  />
                </ListItem>
              </Link>
            ))}
        </List>
        }
    </div>
  );
};

export default NewsList;
