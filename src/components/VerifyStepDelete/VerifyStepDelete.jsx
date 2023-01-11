import './VerifyStepDelete.scoped.css';
import axios from 'axios';
import { apiBaseUrl } from '../../config.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStep } from '../../forms/CreationForm/creationFormSlice';
import { hideModal } from '../Modal/modalSlice.js';
import { hideLoader, showLoader } from '../../loaders/LoadingIndicator/loadingIndicatorSlice';



const VerifyStepDelete = () => {
    const postId = useSelector(state => state.creationForm.post.id);
    const deleteStepNum = useSelector(state => state.verifyStepDelete.deleteStepNum);
    const dispatch = useDispatch();

    const handleYesClick = () => {
        dispatch(hideModal());
        dispatch(showLoader('Deleting step...'));
        dispatch(deleteStep(deleteStepNum));

        let url = `${apiBaseUrl}/images?postId=${postId}&stepNum=${deleteStepNum}`;
        axios.delete(url)
            .then(function (response) {
                console.log('Successfully deleted image on server during step deletion.');
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
            <p>Delete step {deleteStepNum} ?</p>
            <div className='btn-container'>
                <button className='btn' onClick={() => handleYesClick()}>Yes</button>
                <button className='btn' onClick={() => dispatch(hideModal())}>No</button>
            </div>
        </>
    );
};
export default VerifyStepDelete;