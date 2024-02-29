import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import api from "../../api/config/api";
import { useRouter } from "next/router";
import Head from "next/head";
import Cookies from "js-cookie";
import { Loading } from "@nextui-org/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await api
      .post("login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setError(null);
        setIsLoading(false);
        Cookies.set("token", response.data.data.token);
        router.push("/admin/dashboard");
      })
      .catch((err) => {
        setError("Gagal login, silahkan coba kembali");
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/admin/dashboard");
    }
  });

  const isInvalid = email === "" || password === "";

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
                <h1 className="h3 mb-3 mt-3">Masuk ke dashboard admin</h1>
              </div>
              <Form onSubmit={onLogin}>
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

                <Form.Group
                  controlId="formBasicPassword"
                  className="d-flex justify-content-center"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    className="w-50 mt-2 rounded-pill"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                      "Masuk"
                    )}
                  </Button>
                </div>
              </Form>
              <div className="mt-3 text-center">
                <Link href="/admin/auth/cari-email">Lupa password?</Link>
                {error && (
                  <p className="text-danger">
                    <small>{error}</small>
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
