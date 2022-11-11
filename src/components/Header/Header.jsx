import './Header.scoped.css';
import { useDispatch } from 'react-redux';
import { toggleSlideInOpen } from '../../components/Sidebar/sidebarSlice.js';

import { Link } from 'react-router-dom';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const Header = ({ title, logoSrc, children }) => {
  const dispatch = useDispatch();
  const toggleSlideIn = () => dispatch(toggleSlideInOpen());

  return (
    <header className='top-app-bar'>
      <div role='button' className='header-menu-btn' onClick={toggleSlideIn}>
        <HamburgerMenuIcon className='default-icon-size' />
        <span className='sr-only'>toggle extended sidebar menu</span>
      </div>

      <Link to='/' className='unstyled-link title-link'>
        <img className='logo' src={logoSrc} alt={`${title} logo`} />
        <h1 className='title'>{title}</h1>
      </Link>

      <div className='right-content'>{children}</div>
    </header>
  );
};

export default Header;
