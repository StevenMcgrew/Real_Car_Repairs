import './GridItemLoader.scoped.css';

const GridItemLoader = ({ qty }) => {
  const dummyArray = [...Array(qty)];

  return (dummyArray.map((item, idx) => {
    return (
      <div className="card" key={idx}>
        <div className='fake img'></div>
        <div className='lower-container'>
          <div className='fake title'></div>
          <div className='user-container'>
            <div className='fake avatar'></div>
            <div className='fake username'></div>
          </div>
        </div>
      </div>
    );
  })
  );
};

export default GridItemLoader;