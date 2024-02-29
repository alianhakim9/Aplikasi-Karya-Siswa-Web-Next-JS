import Link from "next/link";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import api from "../../api/config/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { Loading } from "@nextui-org/react";

const CariEmail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await api
      .post("password/email", {
        email: email,
      })
      .then(() => {
        setError(null);
        router.push({
          pathname: "/admin/auth/auth-token",
          query: { previousEmail: email },
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Gagal mencari alamat email");
        console.log(err);
      });
  };

  const isInvalid = email === "";

  return (
    <>
      <Head>
        <title>SMK Pariwisata Islam Terpadu Nurul Imam</title>
      </Head>
      <div className="py-5 bg-light d-flex align-items-center justify-content-center vh-100">
        <Container>
          <Row>
            <Col md={6} className="mx-auto">
              <div className="text-center mb-4">
                <img src="/img/logo.png" alt="Quora" height="100" />
                <h1 className="h3 mb-3 mt-3">Halaman reset password</h1>
                <p>Masukan alamat email</p>
              </div>
              <Form onSubmit={onSearch}>
                <Form.Group
                  controlId="formBasicEmail"
                  className="d-flex justify-content-center"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    className="w-50 rounded-pill"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-50 mt-3 rounded-pill"
                    disabled={isInvalid || isLoading}
                  >
                    {isLoading ? (
                      <Loading type="spinner" color="white" size="lg" />
                    ) : (
                      "Cari email"
                    )}
                  </Button>
                </div>
                <div className="mt-3 text-center">
                  <Link href="/admin/auth/login">Masuk</Link>
                  <p className="text-danger">
                    <small>{error}</small>
                  </p>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CariEmail;
