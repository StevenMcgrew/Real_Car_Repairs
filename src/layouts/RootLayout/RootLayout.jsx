import "./RootLayout.scoped.css";
import carServiceImgUrl from '/car-service-96x96.png';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetPost } from "../../forms/CreationForm/creationFormSlice";

import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserDropdown from "../../components/UserDropdown/UserDropdown";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";
import Toast from "../../components/Toast/Toast";
import LoadingIndicator from "../../loaders/LoadingIndicator/LoadingIndicator";

const RootLayout = () => {
    const [previousPathName, setPreviousPathName] = useState('/');
    let location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname === previousPathName) { return; }

        if (previousPathName === '/create') {
            // TODO: put saveProgress function in creationFormSlice.js and invoke it
            console.log('Resetting post');
            dispatch(resetPost());
        }

        // Update previousPathName
        setPreviousPathName(location.pathname);
    }, [location]);

    return (
        <>
            <div className="root-grid">
                <div className="head-area">
                    <Header logoSrc={carServiceImgUrl} title="Real Car Repairs">
                        <UserDropdown />
                    </Header>
                </div>

                <div className="side-area">
                    <Sidebar />
                </div>

                <div className="main-area">
                    {/* web pages (routes) will be rendered at this <Outlet /> */}
                    <Outlet />
                </div>

                <div className="foot-area">
                    <Footer />
                </div>
            </div>
            <Modal />
            <Toast />
            <LoadingIndicator />
        </>
    );
};

export default RootLayout;
