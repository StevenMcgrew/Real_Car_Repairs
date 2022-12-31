import './Toast.scoped.css';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from './toastSlice.js';

const Toast = ({ toastStyle }) => {
    const content = useSelector(state => state.toast.content);
    const isOpen = useSelector(state => state.toast.isOpen);
    const dispatch = useDispatch();

    if (!toastStyle) {
        toastStyle = 'primary';
    }

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                dispatch(hideToast());
            }, 2500);
        }
    }, [isOpen]);

    return (
        <div className={classNames('toast', { 'show': isOpen })}>
            <div className={classNames('toast-content', toastStyle)}>{content}</div>
        </div>
    );
};

export default Toast;