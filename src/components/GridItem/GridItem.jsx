import './GridItem.scoped.css';
import { imagesBaseUrl } from "../../config";
import { backendBaseUrl } from '../../config';

import * as Avatar from '@radix-ui/react-avatar';
import { PersonIcon } from '@radix-ui/react-icons';


const GridItem = (props) => {
  const {
    id,
    thumbnail,
    userThumbnail,
    year,
    make,
    model,
    engine,
    title,
    username,
    created_at } = props.postData;

  return (
    <div className="card">
      <a className='upper-anchor-area' href={`${backendBaseUrl}/post/${id}`}>
        <div>
          <img src={imagesBaseUrl + thumbnail} alt={`Preview image for ${title} for a ${year} ${make} ${model} ${engine}`} />
          <h5>{title}</h5>
          <h6>{`${year} ${make} ${model} ${engine}`}</h6>
        </div>
      </a>
      <a className='lower-anchor-area' href={backendBaseUrl + relativePath}>
        <div className='user-data-container'>
          <Avatar.Root className='AvatarRoot'>
            <Avatar.Image className='AvatarImage' src={imagesBaseUrl + userThumbnail} alt='Image of user' />
            <Avatar.Fallback className='AvatarFallback' delayMs={600}>
              <PersonIcon className='user-icon' />
            </Avatar.Fallback>
          </Avatar.Root>
          <div>
            <p>{username}</p>
            <p>{created_at}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default GridItem;