import './ProfilePage.scoped.css';
import axios from "axios";
import { imagesBaseUrl, apiBaseUrl } from '../../config';
import { useLoaderData } from 'react-router-dom';


function getUser(id) {
    return axios.get(`${apiBaseUrl}/users/${id}`);
}

function getPosts(id) {
    return axios.get(`${apiBaseUrl}/posts?userId=${id}`);
}

export async function profileLoader({ params }) {
    return Promise.all([getUser(params.id), getPosts(params.id)])
        .then(function (results) {
            let user = results[0].data;
            let posts = results[1].data;
            user.posts = posts;
            return user;
        })
        .catch(error => error);
}

const ProfilePage = () => {
    const profile = useLoaderData();
    console.log('PROFILE DATA:  ', profile);

    return (
        <div className='page'>
            <div className='card'>
                <div className='card-head'></div>
                <div className='card-body'>
                    <img src={`${imagesBaseUrl}/${profile.profile_pic}`} alt='Image of user' />
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;