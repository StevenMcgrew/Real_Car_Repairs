import './LoadingIndicator.scoped.css';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const LoadingIndicator = () => {
    const msg = useSelector(state => state.loadingIndicator.msg);
    const isOpen = useSelector((state) => state.loadingIndicator.isOpen);

    return (
        <div className={classNames('loader-backdrop', { 'backdrop-fade-in': isOpen })}>
            <div className='loader card'>
                <div className="ripple-loader">
                    <div className='ripple-div'></div>
                    <div className='ripple-div ripple-second'></div>
                </div>
                <span>{msg}</span>
            </div>
        </div>
    );
};

export default LoadingIndicator;