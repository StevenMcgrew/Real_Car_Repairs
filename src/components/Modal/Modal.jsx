import './Modal.scoped.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from './modalSlice';

// Available components to be inserted into the modal
import SignInForm from '../../forms/SignInForm/SignInForm';
import SignUpForm from '../../forms/SignUpForm/SignUpForm';
import ImageUploader from '../ImageUploader/ImageUploader';
import VerifyStepDelete from '../VerifyStepDelete/VerifyStepDelete';

const Modal = () => {
    const title = useSelector((state) => state.modal.title);
    const content = useSelector((state) => state.modal.content);
    const isOpen = useSelector((state) => state.modal.isOpen);
    const dispatch = useDispatch();

    const closeModal = (e) => {
        if (e.currentTarget.id === e.target.id) {
            dispatch(hideModal());
        }
    };

    return (
        <div id='modalBackdrop' className={classNames('modal-backdrop', { 'backdrop-fade-in': isOpen })} onClick={closeModal}>
            <div className='modal card'>
                <div className="modal-header">
                    <span className='title'>{title}</span>
                    <span id='modalCloseBtn' className="close-btn" onClick={closeModal}>&times;</span>
                </div>
                {
                    content === 'SignInForm' ? <SignInForm />
                        : content === 'SignUpForm' ? <SignUpForm />
                            : content === 'ImageUploader' ? <ImageUploader />
                                : content === 'VerifyStepDelete' ? <VerifyStepDelete />
                                    : content
                }
            </div>
        </div>
    );
};

export default Modal;