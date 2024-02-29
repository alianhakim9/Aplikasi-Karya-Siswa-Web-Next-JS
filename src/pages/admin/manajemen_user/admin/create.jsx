import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import Main from "../../../../layouts/Main";
import api from "../../../api/config/api";
import { useState } from "react";
import { PersonPlus } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import HeaderBreadcrumb from "../../../../components/admin/HeadBreadcrumb";

const Create = () => {
  const router = useRouter();
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const store = async (event) => {
    event.preventDefault();
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.passwordConfirmation === ""
    ) {
      alert("Tidak boleh kosong");
    } else if (formData.password !== formData.passwordConfirmation) {
      alert("Password harus sama");
    } else {
      isLoading(true);
      await api
        .post("manajemen-akun-admin/tambah-admin/store", {
          email: formData.email,
          password: formData.password,
          password_confirm: formData.passwordConfirmation,
        })
        .then(() => {
          isLoading(false);
          setError(null);
          router.push("/admin/manajemen_user/admin/");
        })
        .catch((err) => {
          isLoading(false);
          setError("Terjadi kesalahan saat menambahkan data");
        });
    }
  };

  const isInvalid =
    formData.email === "" ||
    formData.password === "" ||
    formData.passwordConfirmation === "";

  return (
    <>
      <Main>
        <Container>
          <HeaderBreadcrumb
            dashboardUrl="/admin/manajemen_user/"
            previousUrl="/admin/manajemen_user/admin/"
            currentTitle="Tambah akun admin"
            previousTitle="Akun admin"
          />
          <h1 className="mt-4">Tambah akun admin</h1>
          <p>
            Halaman untuk menambah/mendaftarkan akun admin yang digunakan untuk
            login pada situs web admin aplikasi karya siswa
          </p>
          {error && (
            <p className="text-danger">
              <small>{error}</small>
            </p>
          )}
          <Row>
            <Col md={12} lg={12}>
              <Form onSubmit={store}>
                <FormGroup controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup controlId="passwordConfirmation">
                  <Form.Label>Konfirmasi password</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                  />
                </FormGroup>
                <div className="d-flex float-end align-items-center">
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="mt-3 float-end rounded-pill ps-4 pe-4"
                    disabled={isInvalid}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="ms-2">Sedang menambahkan data...</span>
                      </>
                    ) : (
                      <>
                        <PersonPlus />
                        <p className="d-inline ms-2">Tambah</p>
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
          <br />
        </Container>
      </Main>
    </>
  );
};

export default Create;
