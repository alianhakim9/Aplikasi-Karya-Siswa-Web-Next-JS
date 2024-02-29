import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Main from "../../../../../layouts/Main";
import api from "../../../../api/config/api";
import { useEffect, useState } from "react";
import { Save } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import HeaderBreadcrumb from "../../../../../components/admin/HeadBreadcrumb";

export default function Create() {
  const router = useRouter();
  const id = router.query.id;
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: 0,
    jabatan: "",
    nama_lengkap: "",
    user: {
      id: 0,
      email: "",
      role_id: "",
      password: "",
      password_confirmation: "",
    },
  });

  const detail = async () => {
    await api
      .get(`manajemen-tim/edit-tim/${id}`)
      .then((response) => {
        setFormData({
          id: response.data.id,
          jabatan: response.data.jabatan,
          nama_lengkap: response.data.nama_lengkap,
          user: response.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    detail();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const update = async (event) => {
    event.preventDefault();
    isLoading(true);
    await api
      .put("manajemen-tim/edit-tim/update", {
        id: formData.id,
        email: formData.user.email,
        password: formData.user.password,
        password_confirm: formData.user.passwordConfirmation,
        nama_lengkap: formData.nama_lengkap,
        jabatan: formData.jabatan,
      })
      .then(() => {
        isLoading(false);
        router.push("/admin/manajemen_user/tim_ppdb/");
      })
      .catch(() => {
        isLoading(false);
        setError("Terjadi kesalahan pada saat mengubah data");
      });
  };

  const isInvalid =
    formData.email === "" ||
    formData.password === "" ||
    formData.passwordConfirmation === "" ||
    formData.nama_lengkap === "" ||
    formData.jabatan === "";

  return (
    <>
      <Main>
        <Container>
          <HeaderBreadcrumb
            dashboardUrl="/admin/manajemen_user/"
            previousUrl="/admin/manajemen_user/tim_ppdb/"
            currentTitle="Ubah Akun tim ppdb"
            previousTitle="Akun tim ppdb"
          />
          <h1 className="mt-4">Ubah akun tim ppdb</h1>
          <p>
            Halaman untuk mengubah akun tim ppdb yang digunakan untuk login pada
            aplikasi karya siswa
          </p>
          {error && (
            <p className="text-danger">
              <small>{error}</small>
            </p>
          )}
          <Form onSubmit={update}>
            <Row className="mt-3">
              <Col md={6}>
                <p>Form data otentikasi tim ppdb</p>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.user.email}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Email"
                />

                <Form.Control
                  type="password"
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Password"
                />

                <Form.Control
                  type="password"
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Konfirmasi password"
                />
              </Col>
            </Row>
            <p className="text-danger">
              <small>
                * kosongkan password dan konfirmasi password, jika tidak ingin
                diubah
              </small>
            </p>
            <Row className="mt-3">
              <p>Form data profil tim ppdb</p>
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="nama_lengkap"
                  value={formData.nama_lengkap}
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
                        <Save />
                        <p className="d-inline ms-2">Simpan</p>
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
