import { imagesBaseUrl } from '../../config';
import './ListItem.scoped.css';
import { formatUTC } from '../../utils/general-utils';

import * as Avatar from '@radix-ui/react-avatar';
import { PersonIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';


const ListItem = (props) => {
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
        engine } = props.post;

    return (
        <div className='card list-item-container'>
            <Link className='unstyled-anchor' to={`/repair/${id}`}>
                <div className='img-container'>
                    <img className='thumbnail' src={`${imagesBaseUrl}/${thumbnail}`} alt="Thumbnail image for this post" />
                </div>
            </Link>
            <div>
                <Link className='unstyled-anchor' to={`/repair/${id}`}>
                    <p className='title'>{title}</p>
                    <p className='vehicle'>{`${year} ${make} ${model} ${engine}`}</p>
                    <p className='item-date'>{formatUTC(created_on)}</p>
                </Link>
                {
                    user_id ?
                        <Link className='unstyled-anchor' to={`/profile/${user_id}`}>
                            <Avatar.Root className='AvatarRoot'>
                                <Avatar.Image className='AvatarImage' src={`${imagesBaseUrl}/${profile_pic}`} alt='Image of user' />
                                <Avatar.Fallback className='AvatarFallback' delayMs={600}>
                                    <PersonIcon className='user-icon' />
                                </Avatar.Fallback>
                            </Avatar.Root>
                            <div className='username'>{username}</div>
                        </Link>
                        :
                        null
                }
            </div>
        </div>
    );
};

export default ListItem;