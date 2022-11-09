import "./SideBar.scoped.css";
import classNames from "classnames";
import { useState } from "react";

import { Link } from "react-router-dom";
import {
  HomeIcon,
  PlusCircledIcon,
  CountdownTimerIcon,
  ArchiveIcon,
  HamburgerMenuIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSlideIn = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <div role="button" className="menu-btn" onClick={toggleSlideIn}>
        <HamburgerMenuIcon className="default-icon-size" />
        <span className="sr-only">toggle extended sidebar menu</span>
      </div>

      <div className="mini-sidebar-box">
        <nav className="mini-sidebar">
          <ul className="mini-sidebar-list">
            <li className="mini-sidebar-list-item">
              <Link className="mini-sidebar-link" to="/">
                <HomeIcon className="default-icon-size" />
                <span className="btn-text">Home</span>
              </Link>
            </li>

            <li className="mini-sidebar-list-item">
              <Link className="mini-sidebar-link" to="create">
                <PlusCircledIcon className="default-icon-size" />
                <span className="btn-text">Create</span>
              </Link>
            </li>

            <li className="mini-sidebar-list-item">
              <Link className="mini-sidebar-link" to="history">
                <CountdownTimerIcon className="default-icon-size" />
                <span className="btn-text">History</span>
              </Link>
            </li>

            <li className="mini-sidebar-list-item">
              <Link className="mini-sidebar-link" to="library">
                <ArchiveIcon className="default-icon-size" />
                <span className="btn-text">Library</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className={classNames("slide-in-backdrop", {
          "fade-in": isOpen,
        })}
        onClick={toggleSlideIn}
      ></div>
      <div
        className={classNames("slide-in-box", {
          "slide-in": isOpen,
        })}
      >
        <div role="button" className="close-btn" onClick={toggleSlideIn}>
          <ChevronLeftIcon className="default-icon-size" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
