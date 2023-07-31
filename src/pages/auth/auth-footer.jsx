import { Row } from "../../components";

const AuthFooter = () => {
  return (
    <div className="nk-footer nk-auth-footer-full">
      <div className="container">
        <Row className="g-3">
          <div className="text-center">
            <p className="text-soft">
              Tizim {" "}
              <a
                href="https://owa.uz/"
                target="_blank"
                rel="noreferrer"
                className="text-soft"
              >
                <u>OPEN WEB</u>
              </a>{" "}
              kompaniyasi tomonidan ishlab chiqilgan
            </p>
          </div>
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
