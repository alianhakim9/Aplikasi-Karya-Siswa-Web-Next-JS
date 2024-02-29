import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Head from "next/head";
import { Loading } from "@nextui-org/react";

const AuthToken = () => {
  const router = useRouter();
  const { previousEmail } = router.query;
  const email = previousEmail;
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toResetPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    router.push({
      pathname: "/admin/auth/reset-password",
      query: { previousEmail: email, token: token },
    });
    setIsLoading(false);
  };

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
                <img src="/img/logo.png" alt="Logo SMK" height="100" />
                <h1 className="h3 mb-3 mt-3">Masukan Token</h1>
                <p>Cek email untuk melihat kode token</p>
              </div>
              <Form onSubmit={toResetPassword}>
                <Form.Group
                  controlId="formBasicToken"
                  className="d-flex justify-content-center"
                >
                  <Form.Control
                    type="password"
                    placeholder="Kode token"
                    required
                    className="w-50 rounded-pill"
                    onChange={(e) => setToken(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-50 mt-3 rounded-pill"
                    disabled={token === ""}
                  >
                    {isLoading ? (
                      <>
                        <Loading type="spinner" color="white" size="lg" />
                      </>
                    ) : (
                      "Cek token"
                    )}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AuthToken;
