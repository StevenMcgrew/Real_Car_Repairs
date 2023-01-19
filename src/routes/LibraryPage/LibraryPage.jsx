import './LibraryPage.scoped.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const LibraryPage = () => {
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
                </TabPanel>
                <TabPanel>
                    <h1 className='page-title'>My Drafts</h1>
                </TabPanel>
                <TabPanel>
                    <h1 className='page-title'>My Posts</h1>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default LibraryPage;
