import classNames from "classnames";
import "./RootLayout.scoped.css";

import { Outlet, Link, useNavigation } from "react-router-dom";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";

const RootLayout = () => {
  const navigation = useNavigation();

  let mainClassNames = classNames("main-area", {
    loading: navigation.state === "loading",
  });

  return (
    <div className="root-grid">
      <div className="head-area">
        <Header logoSrc="/car-service-96x96.png" title="Real Car Repairs">
          <button>Right</button>
        </Header>
      </div>

      <div className="side-area">
        <SideBar />
      </div>

      <div className={mainClassNames}>
        <Outlet />
      </div>

      <div className="foot-area">
        <button>Footer</button>
      </div>
    </div>
  );
};

export default RootLayout;
