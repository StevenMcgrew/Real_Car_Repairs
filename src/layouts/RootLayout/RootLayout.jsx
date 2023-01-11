import classNames from "classnames";
import "./RootLayout.scoped.css";
import carServiceImgUrl from '/car-service-96x96.png';

//Components
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserDropdown from "../../components/UserDropdown/UserDropdown";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";
import Toast from "../../components/Toast/Toast";
import LoadingIndicator from "../../loaders/LoadingIndicator/LoadingIndicator";

const RootLayout = () => {
    const navigation = useNavigation();

    let mainClassNames = classNames("main-area", {
        loading: navigation.state === "loading",
    });

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

                <div className={mainClassNames}>
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
