import { imagesBaseUrl } from '../../config';
import './StepCard.scoped.css';

const StepCard = (props) => {
    const { stepNum, image, text } = props;

    return (
        <div className='card step'>
            <div>
                <h3 className='step-num'>{`Step ${stepNum}`}</h3>
                <p className='text'>{text}</p>
            </div>
            <div className='img-container'>
                {image ? <img src={`${imagesBaseUrl}/${image}`} alt={`Image for step ${stepNum}`} className='image' /> : null}
            </div>
        </div>
    );
};
export default StepCard;