import './Sidebar.scoped.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSlideInOpen } from './sidebarSlice.js';

import { Link } from 'react-router-dom';
import * as Separator from '@radix-ui/react-separator';
import { HomeIcon, PlusCircledIcon, CountdownTimerIcon, ArchiveIcon, HamburgerMenuIcon, ChevronLeftIcon, InfoCircledIcon, EnvelopeClosedIcon, ListBulletIcon, FileTextIcon } from '@radix-ui/react-icons';

const Sidebar = () => {
  const isSlideInOpen = useSelector((state) => state.sidebar.isSlideInOpen);
  const dispatch = useDispatch();
  const toggleSlideIn = () => dispatch(toggleSlideInOpen());

  return (
    <>
      <div className='sidebar'>
        <div role='button' className='menu-btn' onClick={toggleSlideIn}>
          <HamburgerMenuIcon className='default-icon-size' />
          <span className='sr-only'>toggle extended sidebar menu</span>
        </div>

        <div className='mini-sidebar-box'>
          <nav className='mini-sidebar'>
            <ul className='mini-sidebar-list'>
              <li className='mini-sidebar-list-item'>
                <Link className='mini-sidebar-link' to='/'>
                  <HomeIcon className='default-icon-size' />
                  <span className='btn-text'>Home</span>
                </Link>
              </li>

              <li className='mini-sidebar-list-item'>
                <Link className='mini-sidebar-link' to='create'>
                  <PlusCircledIcon className='default-icon-size' />
                  <span className='btn-text'>Create</span>
                </Link>
              </li>

              <li className='mini-sidebar-list-item'>
                <Link className='mini-sidebar-link' to='history'>
                  <CountdownTimerIcon className='default-icon-size' />
                  <span className='btn-text'>History</span>
                </Link>
              </li>

              <li className='mini-sidebar-list-item'>
                <Link className='mini-sidebar-link' to='library'>
                  <ArchiveIcon className='default-icon-size' />
                  <span className='btn-text'>Library</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className={classNames('slide-in-backdrop', { 'fade-in': isSlideInOpen })} onClick={toggleSlideIn}></div>

      <div className={classNames('slide-in-box', { 'slide-in': isSlideInOpen })}>
        <div role='button' className='close-btn' onClick={toggleSlideIn}>
          <ChevronLeftIcon className='default-icon-size' />
        </div>
        <nav className='slidein-nav custom-scrollbars slidein-scrollbar'>
          <ul className='slidein-ul'>
            <li>
              <Link className='slidein-Link first-link' to='/' onClick={toggleSlideIn}>
                <HomeIcon className='default-icon-size' />
                <span className='slidein-span'>Home</span>
              </Link>
            </li>

            <li>
              <Link className='slidein-Link' to='create' onClick={toggleSlideIn}>
                <PlusCircledIcon className='default-icon-size' />
                <span className='slidein-span'>Create</span>
              </Link>
            </li>

            <li>
              <Link className='slidein-Link' to='history' onClick={toggleSlideIn}>
                <CountdownTimerIcon className='default-icon-size' />
                <span className='slidein-span'>History</span>
              </Link>
            </li>

            <li>
              <Link className='slidein-Link' to='library' onClick={toggleSlideIn}>
                <ArchiveIcon className='default-icon-size' />
                <span className='slidein-span'>Library</span>
              </Link>
            </li>

            <Separator.Root className='SeparatorRoot' decorative />

            <li>
              <Link className='slidein-Link' to='#' onClick={toggleSlideIn}>
                <InfoCircledIcon className='default-icon-size' />
                <span className='slidein-span'>About</span>
              </Link>
            </li>

            <li>
              <Link className='slidein-Link' to='#' onClick={toggleSlideIn}>
                <EnvelopeClosedIcon className='default-icon-size' />
                <span className='slidein-span'>Contact</span>
              </Link>
            </li>

            <li>
              <Link className='slidein-Link' to='#' onClick={toggleSlideIn}>
                <ListBulletIcon className='default-icon-size' />
                <span className='slidein-span'>Terms & Conditions</span>
              </Link>
            </li>

            <li>
              <Link className='slidein-Link' to='#' onClick={toggleSlideIn}>
                <FileTextIcon className='default-icon-size' />
                <span className='slidein-span'>Privacy Policy</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
