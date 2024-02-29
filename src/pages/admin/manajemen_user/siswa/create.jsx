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
    nisn: "",
    jenisKelamin: "",
    agama: "",
    ttl: "",
    alamat: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const store = async (event) => {
    event.preventDefault();

    isLoading(true);
    await api
      .post("manajemen-siswa/tambah-siswa/store", {
        email: formData.email,
        password: "12345678",
        password_confirm: "12345678",
        nama_lengkap: formData.namaLengkap,
        nisn: formData.nisn,
        jenis_kelamin: formData.jenisKelamin,
        agama: formData.agama,
        alamat: formData.alamat,
        ttl: formData.ttl,
      })
      .then(() => {
        isLoading(false);
        setError(null);
        router.push("/admin/manajemen_user/siswa/");
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
            currentTitle="Tambah akun siswa"
            previousTitle="Akun siswa"
          />
          <h1 className="mt-4">Tambah akun siswa</h1>
          <p>
            Halaman untuk menambah/mendaftarkan akun siswa yang digunakan untuk
            login pada situs web siswa aplikasi karya siswa
          </p>
          {error && (
            <p className="text-danger">
              <small>{error}</small>
            </p>
          )}
          <Form onSubmit={store}>
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
                  disabled
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
                  disabled
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
