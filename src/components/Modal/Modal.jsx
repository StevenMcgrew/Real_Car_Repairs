import './Modal.scoped.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from './modalSlice';

// Available components to be inserted into the modal
import SignInForm from '../../components/forms/SignInForm/SignInForm';
import SignUpForm from '../../components/forms/SignUpForm/SignUpForm';

const Modal = () => {
  const title = useSelector((state) => state.modal.title);
  const content = useSelector((state) => state.modal.content);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(hideModal());

  return (
    <>
      <div className={classNames('modal-backdrop', { 'backdrop-fade-in': isOpen })} onClick={closeModal}></div>
      <div className={classNames('modal card', { 'modal-fade-in': isOpen })}>
        <div className="modal-header">
          <span className='title'>{title}</span>
          <span className="close-btn" onClick={closeModal}>&times;</span>
        </div>
        {
          content === 'SignInForm' ? <SignInForm />
            : content == 'SignUpForm' ? <SignUpForm /> : ''
        }
      </div>
    </>

  );
};

export default Modal;