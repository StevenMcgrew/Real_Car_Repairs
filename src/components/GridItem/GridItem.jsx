import './GridItem.scoped.css';
import { imagesBaseUrl } from "../../config";
import { formatUTC } from '../../utils/general-utils';

import * as Avatar from '@radix-ui/react-avatar';
import { PersonIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';


const GridItem = (props) => {
    const {
        id,
        title,
        thumbnail,
        created_on,
        user_id,
        username,
        profile_pic,
        year,
        make,
        model,
        engine } = props.postData;

    return (
        <div className="card">
            <Link className='unstyled-anchor' to={`/repair/${id}`}>
                <div className='img-container'>
                    <img className='thumbnail' src={`${imagesBaseUrl}/${thumbnail}`} alt={`Preview image for ${title} for a ${year} ${make} ${model} ${engine}`} />
                </div>
                <h4 className='title'>{title}</h4>
                <h6 className='vehicle'>{`${year} ${make} ${model} ${engine}`}</h6>
            </Link>

            <div className='user-and-date-container'>
                <Link className='lower-anchor-area unstyled-anchor' to={`/user/${user_id}`}>
                    <Avatar.Root className='AvatarRoot av-root'>
                        <Avatar.Image className='AvatarImage' src={`${imagesBaseUrl}/${profile_pic}`} alt='Image of user' />
                        <Avatar.Fallback className='AvatarFallback' delayMs={600}>
                            <PersonIcon className='user-icon' />
                        </Avatar.Fallback>
                    </Avatar.Root>
                    <div className='username'>{username}</div>
                </Link>
                <div className='date'>{formatUTC(created_on)}</div>
            </div>

        </div>
    );
};

export default GridItem;