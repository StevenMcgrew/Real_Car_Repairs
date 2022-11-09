import "./SideBar.scoped.css";
import classNames from "classnames";
import { useState } from "react";

import { Link } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSlideIn = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <div role="button" className="menu-btn" onClick={toggleSlideIn}>
        <i className="fa fa-bars btn-icon" aria-hidden="true"></i>
        <span className="sr-only">toggle extended sidebar menu</span>
      </div>

      <div className="mini-sidebar-box">
        <nav className="mini-sidebar">
          <ul className="mini-sidebar-list">
            <li className="mini-sidebar-list-item">
              <Link className="mini-sidebar-link" to="/">
                <i className="fa fa-home btn-icon" aria-hidden="true"></i>
                <span className="btn-text">Home</span>
              </Link>
            </li>

            <li className="mini-sidebar-list-item">
              <Link className="mini-sidebar-link" to="create">
                <i className="fa fa-plus btn-icon" aria-hidden="true"></i>
                <span className="btn-text">Create</span>
              </Link>
            </li>

            <li className="mini-sidebar-list-item">
              <Link className="mini-sidebar-link" to="history">
                <i className="fa fa-history btn-icon" aria-hidden="true"></i>
                <span className="btn-text">History</span>
              </Link>
            </li>

            <li className="mini-sidebar-list-item">
              <Link className="mini-sidebar-link" to="library">
                <i className="fa fa-archive btn-icon" aria-hidden="true"></i>
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
      ></div>
    </div>
  );
};

export default SideBar;
