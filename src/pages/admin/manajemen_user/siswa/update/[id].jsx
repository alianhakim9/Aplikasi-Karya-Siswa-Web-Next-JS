import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Save } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import Main from "../../../../../layouts/Main";
import api from "../../../../api/config/api";
import HeaderBreadcrumb from "../../../../../components/admin/HeadBreadcrumb";

export default function Update() {
  const router = useRouter();
  const id = router.query.id;

  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    namaLengkap: "",
    nisn: "",
    jenisKelamin: "",
    agama: "",
    ttl: "",
    alamat: "",
    userId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const detail = async () => {
    await api
      .get(`manajemen-siswa/edit-siswa/${id}`)
      .then((response) => {
        setFormData({
          email: response.data.siswa.user.email,
          password: response.data.siswa.user.password,
          passwordConfirmation: response.data.siswa.user.password,
          namaLengkap: response.data.siswa.nama_lengkap,
          nisn: response.data.siswa.nisn,
          jenisKelamin: response.data.siswa.jenis_kelamin,
          agama: response.data.siswa.agama,
          ttl: response.data.siswa.ttl,
          alamat: response.data.siswa.alamat,
          userId: response.data.siswa.user.id,
        });
      })
      .catch(() => {});
  };

  useEffect(() => {
    detail();
  }, []);

  const update = async (event) => {
    event.preventDefault();
    isLoading(true);
    await api
      .put("manajemen-siswa/edit-siswa/update", {
        id: id,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.passwordConfirmation,
        nama_lengkap: formData.namaLengkap,
        nisn: formData.nisn,
        jenis_kelamin: formData.jenisKelamin,
        agama: formData.agama,
        alamat: formData.alamat,
        ttl: formData.ttl,
        user_id: formData.userId,
      })
      .then(() => {
        isLoading(false);
        setError(null);
        router.push("/admin/manajemen_user/siswa/");
      })
      .catch((err) => {
        isLoading(false);
        setError(err);
      });
  };

  const isInvalid =
    formData.email === "" ||
    formData.password === "" ||
    formData.passwordConfirmation === "" ||
    formData.namaLengkap === "" ||
    formData.nisn === "" ||
    formData.jenisKelamin == "" ||
    formData.agama === "" ||
    formData.alamat === "";

  return (
    <>
      <Main>
        <Container>
          <HeaderBreadcrumb
            dashboardUrl="/admin/manajemen_user/"
            previousUrl="/admin/manajemen_user/siswa/"
            currentTitle="Ubah akun siswa"
            previousTitle="Akun siswa"
          />
          <h1 className="mt-4">Ubah akun siswa</h1>
          <p>
            Halaman untuk mengubah akun siswa yang digunakan untuk login pada
            situs web siswa aplikasi karya siswa
          </p>
          {error && (
            <p className="text-danger">
              <small>{error}</small>
            </p>
          )}
          <Form onSubmit={update}>
            <Row className="mt-3">
              <Col md={6}>
                <p>Form data otentikasi siswa</p>
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
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Password"
                />
                <Form.Control
                  type="password"
                  name="passwordConfirmation"
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Konfirmasi password"
                />
                <p className="text-danger">
                  <small>
                    * kosongkan password dan konfirmasi password, jika tidak
                    ingin diubah
                  </small>
                </p>
              </Col>
            </Row>
            <Row className="mt-3">
              <p>Form data profil siswa</p>
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
                  name="nisn"
                  value={formData.nisn}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="NISN"
                />
                <Form.Select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  className="mb-2"
                  aria-label="Jenis kelamin"
                >
                  <option>Pilih jenis kelamin</option>
                  <option value="P">Perempuan</option>
                  <option value="L">Laki-Laki</option>
                </Form.Select>
                <Form.Select
                  name="agama"
                  value={formData.agama}
                  onChange={handleChange}
                  className="mb-2"
                  aria-label="Agama"
                >
                  <option value="">Pilih Agama</option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </Form.Select>

                <Form.Control
                  type="date"
                  name="ttl"
                  value={formData.ttl}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Tanggal lahir"
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  as="textarea"
                  rows={8}
                  placeholder="Alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
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
