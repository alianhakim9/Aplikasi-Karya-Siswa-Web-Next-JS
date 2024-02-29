import { Container, Row, Col } from "react-bootstrap";

import Head from "next/head";
import Sidebar from "../components/admin/Sidebar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Main = ({ children }) => {
  const now = new Date();
  const year = now.getFullYear();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const token = Cookies.get("token");
    if (!token) {
      router.push("/admin/auth/login");
    }
  }, []);
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  if (!mounted) return <></>;
  return (
    <>
      <Head>
        <title>SMK Pariwisata Islam Terpadu Nurul Imam</title>
      </Head>
      <Container fluid>
        <Row>
          <Col
            xs={3}
            id="sidebar"
            className="position-fixed d-flex flex-column justify-content-between"
            style={{
              backgroundColor: "#073863",
            }}
          >
            <Sidebar />
          </Col>
          <motion.main
            variants={variants} // Pass the variant object into Framer Motion
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: "linear" }} // Set the transition to linear
            className=""
          >
            <Col xs={9} id="main" className="p-5 ms-auto">
              {children}
              <br />
              <footer className="float-end mt-auto mb-4">
                <p>Copyright &copy; {year} SMK Islam Terpadu Nurul Imam</p>
              </footer>
            </Col>
          </motion.main>
        </Row>
      </Container>
    </>
  );
};

export default Main;
