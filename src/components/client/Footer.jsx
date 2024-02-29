import { Container, Row, Col, Image } from "react-bootstrap";
import {
  EnvelopeAtFill,
  Facebook,
  GeoFill,
  Instagram,
  TelephoneFill,
  Twitter,
  Youtube,
} from "react-bootstrap-icons";

function MyFooter() {
  const now = new Date();
  const year = now.getFullYear();
  const data_nurul_imam = [
    {
      title:
        "Jalan Cihanjuang Kampung Cisintok Blok Kadu Mulya I RT.04/RW.04 Desa Cihanjuang-Kecamatan Parongpong-Kabupaten Bandung Barat-Jawa Barat 40559",
      icon: <GeoFill className="me-2" />,
      type: "text",
    },
    {
      title: "(022) 67781665",
      icon: <TelephoneFill className="me-2" />,
      type: "text",
    },
    {
      title: "smkpariwisatanurulimam@gmail.com",
      icon: <EnvelopeAtFill className="me-2" />,
      type: "email",
    },
  ];
  const sosial_media = [
    { link: "", icon: <Instagram size={30} /> },
    {
      link: "https://www.youtube.com/@smkislamterpadunurulimam6188",
      icon: <Youtube size={30} />,
    },
    {
      link: "https://www.facebook.com/pages/Smp-Smk-It-Nurul-Imam/743191649157583",
      icon: <Facebook size={30} />,
    },
    { link: "", icon: <Twitter size={30} /> },
  ];
  return (
    <footer
      className="text-light"
      style={{
        backgroundColor: "#073863",
      }}
    >
      <div className="text-left text-md-center pt-4">
        <Image
          src="/img/logo.png"
          alt="logo"
          className="img-fluid"
          width={150}
        />
      </div>
      <Row className="p-md-5">
        <Col md={3}>
          <Container>
            <h4 className="fw-bold mt-2">
              SMK Pariwisata Islam Terpadu Nurul Imam
            </h4>
            <p>
              <small>
                Menghasilkan lulusan yang memiliki karakter aktif ,kreatif,
                inovatif, analitis Memiliki lulusan yang berprestasi di bidang
                akademik, seni dan keagamaan.
              </small>
            </p>
          </Container>
        </Col>
        <Col md={3}>
          <Container className="mt-3 mt-md-0">
            <h4>Kontak & Alamat</h4>
            <div className="d-flex flex-column">
              {data_nurul_imam.map((item, i) => (
                <span className="text-light" key={i}>
                  {item.icon}
                  {item.type === "email" ? (
                    <a
                      href={`mailto: ${item.title}`}
                      type="email"
                      className="nav-link d-inline"
                      target="_blank"
                    >
                      <small>{item.title}</small>
                    </a>
                  ) : (
                    <small>{item.title}</small>
                  )}
                </span>
              ))}
            </div>
          </Container>
        </Col>
        <Col md={3}>
          <Container className="mt-3 mt-md-0">
            <h4>Yayasan Harpa Nur Imam</h4>
            <span className="text-light">
              {data_nurul_imam[0].icon}
              <small>{data_nurul_imam[0].title}</small>
            </span>
          </Container>
        </Col>
        <Col md={3}>
          <Container className="mb-5 mb-md-0 mt-3 mt-md-0">
            <h4 className="mb-3">Ikuti Sosial Media Kami:</h4>
            {sosial_media.map((item, i) => (
              <span className="me-4" key={i}>
                <a
                  href={item.link}
                  className="nav-link d-inline"
                  target="_blank"
                >
                  {item.icon}
                </a>
              </span>
            ))}
          </Container>
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: "#ea4905",
        }}
        className="pt-2"
      >
        <Col className="text-start ps-4 ps-md-0 text-md-center">
          <p>
            Copyright &copy; {year} SMK Pariwisata Islam Terpadu Nurul Imam. All
            rights reserved.
          </p>
        </Col>
      </Row>
    </footer>
  );
}

export default MyFooter;
