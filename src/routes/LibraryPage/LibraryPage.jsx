import './LibraryPage.scoped.css';
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "../../components/Modal/modalSlice";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const LibraryPage = () => {
    const username = useSelector(state => state.userDropdown.username);
    const dispatch = useDispatch();

    if (!username) {
        return (
            <div className="page sign-in-reminder">
                <p>
                    Sign in to browse your library.
                </p>
                <button className='reminder-btn' onClick={() => dispatch(showModal({ title: 'Sign In', content: 'SignInForm' }))}>Sign in</button>
                <button className='reminder-btn outline-btn' onClick={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>Sign up</button>
            </div>
        );
    }
    return (
        <div className='page'>
            <Tabs>
                <TabList>
                    <Tab>View Later</Tab>
                    <Tab>My Drafts</Tab>
                    <Tab>My Posts</Tab>
                </TabList>

                <TabPanel>
                    <h1 className='page-title'>View Later</h1>
                    <p>This feature has not been implemented yet.</p>
                </TabPanel>
                <TabPanel>
                    <h1 className='page-title'>My Drafts</h1>
                    <p>This feature has not been implemented yet.</p>
                </TabPanel>
                <TabPanel>
                    <h1 className='page-title'>My Posts</h1>
                    <p>This feature has not been implemented yet.</p>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default LibraryPage;
