import './Expandable.scoped.css';
import classNames from 'classnames';

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const Expandable = (props) => {
  const { title, children } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e) => {
    let panel = e.currentTarget.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <button className={classNames('expand-btn', { 'no-bottom-radius': isExpanded })} onClick={toggleExpand}>
        <span>{title}</span>
        <span className='arrow-icon'>{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
      </button>
      <div className={classNames('expand-panel', { 'opaque': isExpanded })}>
        {children}
      </div>
    </>
  );
};

export default Expandable;