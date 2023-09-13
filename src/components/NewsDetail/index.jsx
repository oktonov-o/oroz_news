// src/components/NewsDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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
    <div>
        <h1>News Detail</h1>
        <Link to="/">Back to all news</Link>
        {
            isLoading
            ? <h3>Loading...</h3>
            : <>
                <p>URL: <a href={newsItem.url} target="_blank" rel="noopener noreferrer">{newsItem.url}</a></p>
                <h2>{newsItem.title}</h2>
                <p>Date: {new Date(newsItem.time * 1000).toLocaleDateString()}</p>
                <p>Author: {newsItem.by}</p>
            </>
        }
        {/* Render other relevant fields as needed */}
    </div>
  );
};

export default NewsDetail;
