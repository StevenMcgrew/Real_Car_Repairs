import "./HomePage.scoped.css";
import axios from "axios";
import { useState, useEffect } from 'react';

import GridItem from "../../components/GridItem/GridItem";
import GridItemLoader from "../../loaders/GridItemLoader/GridItemLoader";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    axios.get('https://stevenmcgrew.us/api/ve/calcu') // lations?limit=20
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        setFetchError(error);
      });
  }, []);

  if (fetchError) {
    return (
      <>
        <h3>Failed to fetch data</h3>
        <p>{fetchError.message}</p>
      </>
    );
  }

  if (posts.length) {
    return (
      <div className="auto-grid">
        {posts.map(post => <GridItem post={post} key={post.id} />)}
      </div>
    );
  }

  return (
    <div className="auto-grid">
      <GridItemLoader qty={8} />
    </div>
  );
};

export default HomePage;
