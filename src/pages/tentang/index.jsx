import { Carousel, CarouselItem, Col, Image, Row } from "react-bootstrap";
import Main from "../../layouts/client/Main";

const About = () => {
  const images = [
    { url: "/img/sekolah/gedung.jpg" },
    { url: "/img/sekolah/creativity.jpg" },
  ];
  return (
    <Main>
      <Row className="mt-5">
        <Col md={6} xm={12}>
          <Carousel>
            {images &&
              images.map((item, i) => (
                <Carousel.Item key={i}>
                  <Image
                    className="img-fluid rounded w-100"
                    src={item.url}
                    alt="tentang"
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>
        <Col md={6} sm={12}>
          <h1 className="pt-3 pt-md-0">
            SMK Pariwisata Islam Terpadu Nurul Imam
          </h1>
          <p>
            SMK Pariwisata IT Nurul Imam adalah merupakan SMK Pariwisata
            satu-satunya yang ada di Kecamatan Parongpong sehingga mempunyai
            banyak potensi untuk maju dan berkembang ke depannya. Salah satu
            bentuk dukungan dari masyarakat sekitar yaitu dengan keikutsertaan
            masyarakat sekitar dalam kegiatan sekolah salah satunya yaitu
            Creativity Days
          </p>
        </Col>
      </Row>
    </Main>
  );
};

export default About;
