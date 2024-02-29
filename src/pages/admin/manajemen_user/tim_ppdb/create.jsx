import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Main from "../../../../layouts/Main";
import api from "../../../api/config/api";
import { useState } from "react";
import { PersonPlus } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import HeaderBreadcrumb from "../../../../components/admin/HeadBreadcrumb";

export default function Create() {
  const router = useRouter();

  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: 12345678,
    passwordConfirmation: 12345678,
    namaLengkap: "",
    jabatan: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const store = async (event) => {
    event.preventDefault();
    isLoading(true);
    await api
      .post("manajemen-tim/tambah-tim/store", {
        email: formData.email,
        password: formData.password,
        password_confirm: formData.passwordConfirmation,
        nama_lengkap: formData.namaLengkap,
        jabatan: formData.jabatan,
      })
      .then(() => {
        isLoading(false);
        setError(null);
        router.push("/admin/manajemen_user/tim_ppdb/");
      })
      .catch(() => {
        isLoading(false);
        setError("Terjadi kesalahan pada saat menambahkan data");
      });
  };

  const isInvalid =
    formData.email === "" ||
    formData.password === "" ||
    formData.passwordConfirmation === "" ||
    formData.namaLengkap === "" ||
    formData.jabatan === "";

  return (
    <>
      <Main>
        <Container>
          <HeaderBreadcrumb
            dashboardUrl="/admin/manajemen_user/"
            previousUrl="/admin/manajemen_user/tim_ppdb/"
            currentTitle="Tambah Akun tim ppdb"
            previousTitle="Akun tim ppdb"
          />
          <h1 className="mt-4">Tambah akun tim ppdb</h1>
          <p>
            Halaman untuk menambah/mendaftarkan akun tim ppdb yang digunakan
            untuk login pada aplikasi karya siswa
          </p>
          {error && (
            <p className="text-danger">
              <small>{error}</small>
            </p>
          )}
          <Form onSubmit={store}>
            <Row className="mt-3">
              <Col md={6}>
                <p>Form data otentikasi tim ppdb</p>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Email"
                />
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Password"
                />
                <Form.Control
                  type="password"
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Konfirmasi password"
                />
                <div className="bg-secondary text-light p-2 rounded">
                  <span>
                    <small>
                      * Password default adalah :{" "}
                      <span className="fw-bold">12345678</span> <br /> * Demi
                      keamanan login, setiap pengguna diharapkan untuk merubah
                      PASSWORD Default !
                    </small>
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <p>Form data profil tim ppdb</p>
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Nama lengkap"
                />
                <Form.Control
                  type="text"
                  maxLength={10}
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="jabatan"
                />
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
              </Col>
            </Row>
          </Form>
          <br />
        </Container>
      </Main>
    </>
  );
}
