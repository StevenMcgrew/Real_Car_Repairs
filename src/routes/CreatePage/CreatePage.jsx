import './CreatePage.scoped.css';
import { useSelector, useDispatch } from 'react-redux';
import CreationForm from "../../forms/CreationForm/CreationForm";
import { showModal } from '../../components/Modal/modalSlice';

const CreatePage = () => {
    const username = useSelector(state => state.userDropdown.username);
    const dispatch = useDispatch();

    if (!username) {
        return (
            <div className='page sign-in-reminder'>
                <p>
                    You must be signed in to create repair documents.
                </p>
                <button className='reminder-btn' onClick={() => dispatch(showModal({ title: 'Sign In', content: 'SignInForm' }))}>Sign in</button>
                <button className='reminder-btn outline-btn' onClick={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>Sign up</button>
            </div>
        );
    }
    return (
        <div className="page">
            <CreationForm />
        </div>
    );
};

export default CreatePage;