import { Image, Nav, NavLink } from "react-bootstrap";
import Link from "next/link";
import { BoxArrowInRight, HouseFill, PeopleFill } from "react-bootstrap-icons";
import LogoutModal from "./LogoutModal";
import { useEffect, useState } from "react";
import api from "../../pages/api/config/api";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setCurrentUser] = useState("");

  const getCurrentUser = async () => {
    await api
      .get("current-user")
      .then((response) => {
        localStorage.setItem("email_admin", response.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
    setCurrentUser(localStorage.getItem("email_admin"));
  }, []);

  return (
    <Nav
      className="d-flex flex-column p-4 align-items-center"
      style={{ height: "100vh" }}
    >
      <Nav.Item className="text-center">
        <Image
          src="/img/logo.png"
          className="img-fluid mt-5 m-auto rounded-circle mb-4 w-50"
          alt="logo"
        />
        <div className="text-light">
          <h3 className="fw-bold">{user}</h3>
          <h6>Akun admin</h6>
        </div>
      </Nav.Item>
      <div className="mt-3">
        <Nav.Item>
          <NavLink>
            <HouseFill color="white" className="me-2" />
            <Link href="/admin/dashboard/" legacyBehavior>
              <span className="text-light">Dashboard</span>
            </Link>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink>
            <PeopleFill color="white" className="me-2" />
            <Link href="/admin/manajemen_user/" legacyBehavior>
              <span className="text-light">Kelola akun</span>
            </Link>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink onClick={() => setShowModal(true)}>
            <BoxArrowInRight color="white" className="me-2" />
            <span className="text-light">Keluar</span>
          </NavLink>
        </Nav.Item>
      </div>
      <LogoutModal show={showModal} onHide={() => setShowModal(false)} />
    </Nav>
  );
};

export default Sidebar;
