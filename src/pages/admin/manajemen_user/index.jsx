import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Main from "../../../layouts/Main";
import Link from "next/link";

export default function Index() {
  const menu = [
    { title: "Akun siswa", icon: "", url: "manajemen_user/siswa/" },
    { title: "Akun guru", icon: "", url: "manajemen_user/guru/" },
    { title: "Akun tim PPDB", icon: "", url: "manajemen_user/tim_ppdb/" },
    { title: "Akun admin", icon: "", url: "manajemen_user/admin/" },
  ];

  return (
    <>
      <Main>
        <div className="d-flex  justify-content-center">
          <Container>
            <div className="text-center">
              <Image
                src="/img/logo.png"
                alt="Logo"
                width={100}
                className="mb-3"
              />
              <h1 className="fw-bold">Halaman kelola akun</h1>
              <p>Halaman untuk mengelola akun aplikasi karya siswa</p>
            </div>
            <Row className="mt-5">
              {menu.map((item, i) => (
                <Col md={3} key={i}>
                  <Card className="p-4 text-center">
                    <Image src="/img/user.png" alt="title" />
                    <h5>{item.title}</h5>
                    <Link
                      href={item.url}
                      className="btn btn-primary rounded-pill mt-2"
                      style={{
                        backgroundColor: "#ea4905",
                        border: 0,
                      }}
                    >
                      lihat detail akun
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </Main>
    </>
  );
}
