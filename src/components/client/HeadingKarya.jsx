import { Col, Row } from "react-bootstrap";

const HeadingKarya = (props) => {
  const { title, subTitle, icon } = props;
  return (
    <>
      <Row className="justify-content-center mt-5 mb-5">
        <Col md={8} className="text-center">
          {icon}
          <h1 className="fw-bold">{title}</h1>
          <p>{subTitle}</p>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default HeadingKarya;
