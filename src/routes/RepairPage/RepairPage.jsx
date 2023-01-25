import './RepairPage.scoped.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiBaseUrl, imagesBaseUrl } from "../../config";
import { hideLoader, showLoader } from "../../loaders/LoadingIndicator/loadingIndicatorSlice";
import { formatAxiosError, formatUTC } from "../../utils/general-utils";
import { useLoaderData, Link } from 'react-router-dom';
import * as Avatar from '@radix-ui/react-avatar';
import { PersonIcon } from '@radix-ui/react-icons';


export async function repairLoader({ params }) {
    return axios.get(`${apiBaseUrl}/posts/${params.id}`)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}


const RepairPage = () => {
    const repair = useLoaderData();
    // const [repair, setRepair] = useState({});
    // const [fetchError, setFetchError] = useState('');
    // const [searchParams] = useSearchParams();
    // const dispatch = useDispatch();



    // useEffect(() => {
    //     dispatch(showLoader('Loading...'));
    //     const repairId = searchParams.get('id');
    //     const url = `${apiBaseUrl}/posts/${repairId}`;

    //     axios.get(url)
    //         .then(response => {
    //             console.log(response.data);
    //             setRepair(response.data);
    //         })
    //         .catch(error => {
    //             setFetchError(formatAxiosError(error));
    //         })
    //         .finally(() => {
    //             dispatch(hideLoader());
    //         });
    // }, []);

    // if (fetchError) {
    //     return (
    //         <>
    //             <h3>Failed to fetch data</h3>
    //             <p>{fetchError}</p>
    //         </>
    //     );
    // }

    if (repair) {
        return (
            <div className='page'>
                <h1 className="page-title">{repair.title}</h1>

                <h2>{`${repair.year} ${repair.make} ${repair.model} ${repair.engine}`}</h2>

                <div className='user-and-date-container und-box'>
                    <Link className='lower-anchor-area unstyled-anchor' to={`/user/${repair.user_id}`}>
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
                        <div key={index}>
                            {step.img ? <img src={`${imagesBaseUrl}/${step.img}`} /> : null}
                            <p>{step.text}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <p>Error:  failed to load data</p>
    );
};
export default RepairPage;