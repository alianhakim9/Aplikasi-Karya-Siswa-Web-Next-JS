import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import api from "../../api/config/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { Loading } from "@nextui-org/react";

const ResetPassword = () => {
  const router = useRouter();
  const { previousEmail, token } = router.query;

  const [email, setEmail] = useState(previousEmail);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onResetPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await api
      .post("password/reset", {
        token: token,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then(() => {
        setError(null);
        setIsLoading(false);
        router.push("/admin/auth/login");
      })
      .catch(() => {
        setError("Terjadi kesalahan saat mereset password");
        setIsLoading(false);
      });
  };

  const isInvalid =
    token === "" ||
    email === "" ||
    password === "" ||
    passwordConfirmation === "";

  const isPasswordNotSame =
    passwordConfirmation !== password &&
    password !== "" &&
    passwordConfirmation !== "";
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
                <h1 className="h3 mb-3 mt-3">Masukan password baru</h1>
                {isPasswordNotSame && (
                  <div className="text-danger">
                    <p>
                      <small>Password tidak sama</small>
                    </p>
                  </div>
                )}
              </div>
              <Form onSubmit={onResetPassword}>
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

                <Form.Group
                  controlId="formBasicPassword"
                  className="d-flex justify-content-center"
                >
                  <Form.Control
                    type="password"
                    placeholder="Konfirmasi password"
                    required
                    className="w-50 mt-2 rounded-pill"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                      <>
                        <Loading type="spinner" color="white" size="lg" />
                      </>
                    ) : (
                      "Reset password"
                    )}
                  </Button>
                  {error && (
                    <p className="text-danger">
                      <small>{error}</small>
                    </p>
                  )}
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ResetPassword;
