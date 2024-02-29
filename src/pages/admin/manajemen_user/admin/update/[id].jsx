import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Save } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import Main from "../../../../../layouts/Main";
import api from "../../../../api/config/api";
import { Loading } from "@nextui-org/react";
import HeaderBreadcrumb from "../../../../../components/admin/HeadBreadcrumb";

export default function Update() {
  const router = useRouter();
  const id = router.query.id;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirm: "",
  });
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const detail = async () => {
    await api
      .get(`manajemen-akun-admin/edit-admin/${id}`)
      .then((response) => {
        setFormData({
          email: response.data.email,
          password: response.data.password,
          password_confirm: response.data.password,
        });
      })
      .catch(() => {});
  };

  const update = async (event) => {
    event.preventDefault();
    isLoading(true);
    await api
      .put("manajemen-akun-admin/edit-admin/update", {
        id: id,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.password_confirm,
      })
      .then(() => {
        isLoading(false);
        setError(null);
        router.push("/admin/manajemen_user/admin/");
      })
      .catch((err) => {
        setError("Terjadi kesalahan saat mengubah data");
        isLoading(false);
      });
  };

  useEffect(() => {
    detail();
  }, []);

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
            currentTitle="Ubah akun admin"
            previousTitle="Akun admin"
          />
          <h1 className="mt-4">Ubah akun admin</h1>
          <p>
            Halaman untuk mengubah akun admin yang digunakan untuk login pada
            situs web admin aplikasi karya siswa
          </p>
          {error && (
            <p className="text-danger">
              <small>{error}</small>
            </p>
          )}
          <Row>
            <Col md={12} lg={12}>
              <Form onSubmit={update}>
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
                    // value={formData.password}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup controlId="password_confirm">
                  <Form.Label>Konfirmasi password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password_confirm"
                    // value={formData.password_confirm}
                    onChange={handleChange}
                  />
                </FormGroup>
                <p className="text-danger">
                  <small>
                    * kosongkan password dan konfirmasi password, jika tidak
                    ingin diubah
                  </small>
                </p>
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
                        <span className="ms-2">Sedang menyimpan data...</span>
                      </>
                    ) : (
                      <>
                        <Save />
                        <p className="d-inline ms-2">Simpan</p>
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
}
