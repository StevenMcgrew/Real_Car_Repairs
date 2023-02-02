import './VerifyPostDelete.scoped.css';
import axios from 'axios';
import { formatAxiosError } from '../../utils/general-utils';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../config.js';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../Modal/modalSlice.js';
import { hideLoader, showLoader } from '../../loaders/LoadingIndicator/loadingIndicatorSlice';
import { showToast } from '../Toast/toastSlice';
import { resetPost } from '../../forms/CreationForm/creationFormSlice';


const VerifyPostDelete = () => {
    const postId = useSelector(state => state.creationForm.post.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleYesClick = () => {
        dispatch(hideModal());
        dispatch(showLoader('Deleting post...'));

        let url = `${apiBaseUrl}/posts/${postId}`;
        axios.delete(url, { withCredentials: true })
            .then(function (response) {
                dispatch(resetPost());
                dispatch(showToast({ content: 'Deleted post' }));
                navigate('/');
            })
            .catch(function (error) {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            })
            .finally(function () {
                dispatch(hideLoader());
            });
    };

    return (
        <>
            <p>Delete this post completely?</p>
            <div className='btn-container'>
                <button className='btn' onClick={() => handleYesClick()}>Yes</button>
                <button className='btn' onClick={() => dispatch(hideModal())}>No</button>
            </div>
        </>
    );
};

export default VerifyPostDelete;