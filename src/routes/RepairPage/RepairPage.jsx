import './RepairPage.scoped.css';
import axios from "axios";
import { apiBaseUrl, imagesBaseUrl } from "../../config";
import { formatUTC } from "../../utils/general-utils";
import { useLoaderData, Link } from 'react-router-dom';
import * as Avatar from '@radix-ui/react-avatar';
import { PersonIcon } from '@radix-ui/react-icons';
import StepCard from '../../components/StepCard/StepCard';


export async function repairLoader({ params }) {
    return axios.get(`${apiBaseUrl}/posts/${params.id}`, { withCredentials: true })
        .then(response => response.data)
        .catch(error => error);
}

const RepairPage = () => {
    const repair = useLoaderData();

    return (
        <div className='page'>
            <h1 className="page-title title">{repair.title}</h1>

            <h2 className='vehicle'>{`${repair.year} ${repair.make} ${repair.model} ${repair.engine}`}</h2>

            <div className='user-and-date-container und-box'>
                <Link className='lower-anchor-area unstyled-anchor' to={`/profile/${repair.user_id}`}>
                    <Avatar.Root className='AvatarRoot av-root'>
                        <Avatar.Image className='AvatarImage' src={`${imagesBaseUrl}/${repair.profile_pic}`} alt='Image of user' />
                        <Avatar.Fallback className='AvatarFallback' delayMs={600}>
                            <PersonIcon className='user-icon' />
                        </Avatar.Fallback>
                    </Avatar.Root>
                    <div className='username'>{repair.username}</div>
                </Link>
                <div className='date'><i>Last updated: </i>{formatUTC(repair.created_on)}</div>
            </div>

            {JSON.parse(repair.steps).map((step, index) => {
                return (
                    <StepCard
                        key={index}
                        stepNum={index + 1}
                        image={step.img}
                        text={step.text}
                    />
                );
            })}
        </div>
    );
};

export default RepairPage;