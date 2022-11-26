import './LoadingIndicator.scoped.css';

const LoadingIndicator = (props) => {
  const { msg } = props;

  return (
    <div className='loader-backdrop'>
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