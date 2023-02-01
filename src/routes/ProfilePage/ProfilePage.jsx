import './ProfilePage.scoped.css';
import axios from "axios";
import { imagesBaseUrl, apiBaseUrl } from '../../config';
import { useLoaderData } from 'react-router-dom';
import { formatUTC } from '../../utils/general-utils';
import ListItem from '../../components/ListItem/ListItem';


function getUser(id) {
    return axios.get(`${apiBaseUrl}/users/${id}`, { withCredentials: true });
}

function getPosts(id) {
    return axios.get(`${apiBaseUrl}/posts?userId=${id}`, { withCredentials: true });
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

    return (
        <div className='page'>

            <div className='user-container'>
                <img className='profile-pic' src={`${imagesBaseUrl}/${profile.profile_pic}`} alt='Image of user' />
                <div className='name-and-date-container'>
                    <p className='profile-name'>{profile.username}</p>
                    <p className='profile-details'>Member since: {formatUTC(profile.created_on)}</p>
                    <p className='profile-details'>Number of posts: {profile.posts.length}</p>
                </div>
            </div>

            <h3 className='posts-header'>{`${profile.username}'s Posts:`}</h3>

            {profile.posts.length ? (
                profile.posts.map((post, index) => {
                    return (
                        <ListItem
                            key={index}
                            post={post}
                        />
                    );
                })
            )
                :
                <>
                    <p>This member has not posted anything yet</p>
                </>
            }
        </div>
    );
};
export default ProfilePage;