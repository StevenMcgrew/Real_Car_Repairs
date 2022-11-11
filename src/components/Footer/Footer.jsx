import "./Footer.scoped.css";

const Footer = () => {
  return (
    <footer>
      <p className="footer-p">
        <a
          target="_blank"
          href="https://icons8.com/icon/mze1JcS3CX2Y/car-service"
        >
          Car Service{" "}
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          {" "}
          Icons8
        </a>
      </p>
      <p className="footer-p">&copy; 2022 Steven McGrew</p>
    </footer>
  );
};
export default Footer;
