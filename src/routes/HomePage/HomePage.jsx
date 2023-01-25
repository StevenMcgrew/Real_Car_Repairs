import "./HomePage.scoped.css";
import axios from "axios";
import { useState, useEffect } from 'react';
import { apiBaseUrl } from "../../config";
import { formatAxiosError } from "../../utils/general-utils";

import GridItem from "../../components/GridItem/GridItem";
import GridItemLoader from "../../loaders/GridItemLoader/GridItemLoader";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        axios.get(apiBaseUrl + '/posts?featured=true')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                setFetchError(formatAxiosError(error));
            });
    }, []);

    if (fetchError) {
        return (
            <>
                <h3>Failed to fetch data</h3>
                <p>{fetchError}</p>
            </>
        );
    }

    if (posts.length) {
        return (
            <div className="auto-grid">
                {posts.map(post => <GridItem postData={post} key={post.id} />)}
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
