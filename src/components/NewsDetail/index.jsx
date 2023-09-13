// src/components/NewsDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { Button, Typography } from '@mui/material'

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific news item using the ID from the URL
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then((response) => {
        setNewsItem(response.data);
        setIsLoading(false);
    });
  }, [id]);

  return (
    <div className='newsDetailContainer'>
        <h1>News Detail</h1>
        <Button variant="contained" component={Link} to="/">Back to all News</Button>
        {
            isLoading
            ? <h3>Loading...</h3>
            : <div className='detailCard'>
                <h2>{newsItem.title}</h2>
                <Typography>Source: <a href={newsItem.url} target="_blank" rel="noopener noreferrer">{newsItem.url}</a></Typography>
                <div className='info'>
                  <Typography>Date: {new Date(newsItem.time * 1000).toLocaleDateString()}</Typography>
                  <Typography>Author: {newsItem.by}</Typography>
                </div>
            </div>
        }
    </div>
  );
};

export default NewsDetail;
