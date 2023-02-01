import './HistoryPage.scoped.css';
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "../../components/Modal/modalSlice";


const HistoryPage = () => {
    const username = useSelector(state => state.userDropdown.username);
    const dispatch = useDispatch();

    if (!username) {
        return (
            <div className="page sign-in-reminder">
                <p>
                    Sign in to see your view history.
                </p>
                <button className='reminder-btn' onClick={() => dispatch(showModal({ title: 'Sign In', content: 'SignInForm' }))}>Sign in</button>
                <button className='reminder-btn outline-btn' onClick={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>Sign up</button>
            </div>
        );
    }
    return (
        <div className='page'>
            <h1 className="page-title">View History</h1>
            <p>This feature has not been implemented yet.</p>
        </div>
    );
};

export default HistoryPage;
