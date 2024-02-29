import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";

function MyNavbar() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const title = "SMK Pariwisata Islam Terpadu Nurul Imam";
  const logo = "/img/logo.png";
  const links = [
    {
      title: "Home",
      link: "/",
      isActive: router.pathname === "/",
    },
    {
      title: "Karya visual",
      link: "/karya-visual/",
      isActive: router.pathname === "/karya-visual",
    },
    {
      title: "Karya Tulis",
      link: "/karya-tulis/",
      isActive: router.pathname === "/karya-tulis",
    },
    {
      title: "Tentang",
      link: "/tentang",
      isActive: router.pathname === "/tentang",
    },
  ];

  return (
    <Navbar
      variant="light"
      collapseOnSelect
      expand="lg"
      className="p-3 p-md-4 bg-light shadow-sm fixed-top"
    >
      <Container>
        <Navbar.Brand className="d-flex flex-row">
          <Image src={logo} alt="Logo SMK" width={40} height={40} />
          <div className="d-flex flex-column p-2 pt-0 pb-0">
            <small>Karya siswa</small>
            <span className="fw-bold d-none d-md-inline">{title}</span>
            <span className="fw-bold d-inline d-md-none">SMK Nurul Imam</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {links.map((item, i) => (
              <Nav.Link
                key={i}
                as={Link}
                href={item.link}
                active={item.isActive}
              >
                {item.title}
              </Nav.Link>
            ))}
            <Nav.Item>
              <Button
                as={Link}
                href="/admin/auth/login"
                className="rounded-pill ps-3 pe-3"
              >
                Login
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
