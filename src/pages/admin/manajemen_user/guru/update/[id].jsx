import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Main from "../../../../../layouts/Main";
import api from "../../../../api/config/api";
import { useEffect, useState } from "react";
import { Save } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import HeaderBreadcrumb from "../../../../../components/admin/HeadBreadcrumb";

const Create = () => {
  const router = useRouter();
  const id = router.query.id;

  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    namaLengkap: "",
    gelar: "",
    jabatan: "",
    nuptk: "",
    jenisKelamin: "",
    agama: "",
    ttl: "",
    alamat: "",
    userId: 0,
  });

  const detail = async () => {
    await api
      .get(`manajemen-guru/edit-guru/${id}`)
      .then((response) => {
        setFormData({
          email: response.data.user.email,
          password: response.data.user.password,
          passwordConfirmation: response.data.user.password,
          namaLengkap: response.data.nama_lengkap,
          nuptk: response.data.nuptk,
          gelar: response.data.gelar,
          jabatan: response.data.jabatan,
          jenisKelamin: response.data.jenis_kelamin,
          agama: response.data.agama,
          ttl: response.data.ttl,
          alamat: response.data.alamat,
          userId: response.data.user.id,
        });
      })
      .catch(() => {});
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
      .put("manajemen-guru/edit-guru/update", {
        id: id,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.passwordConfirmation,
        nama_lengkap: formData.namaLengkap,
        gelar: formData.gelar,
        jabatan: formData.jabatan,
        nuptk: formData.nuptk,
        jenis_kelamin: formData.jenisKelamin,
        agama: formData.agama,
        alamat: formData.alamat,
        ttl: formData.ttl,
        user_id: formData.userId,
      })
      .then(() => {
        isLoading(false);
        setError(null);
        router.push("/admin/manajemen_user/guru/");
      })
      .catch((err) => {
        isLoading(false);
        setError("Terjadi kesalahan saat mengubah data");
      });
  };

  const isInvalid =
    formData.email === "" ||
    formData.password === "" ||
    formData.passwordConfirmation === "" ||
    formData.namaLengkap === "" ||
    formData.nuptk === "" ||
    formData.jenisKelamin == "" ||
    formData.agama === "" ||
    formData.alamat === "";

  return (
    <>
      <Main>
        <Container>
          <HeaderBreadcrumb
            dashboardUrl="/admin/manajemen_user/"
            previousUrl="/admin/manajemen_user/guru/"
            currentTitle="Ubah akun guru"
            previousTitle="Akun guru"
          />
          <h1 className="mt-4">Ubah akun guru</h1>
          <p>
            Halaman untuk menambah/mendaftarkan akun guru yang digunakan untuk
            login pada situs web guru aplikasi karya siswa
          </p>
          {error && (
            <p className="text-danger">
              <small>{error}</small>
            </p>
          )}
          <Form onSubmit={update}>
            <Row className="mt-3">
              <Col md={6}>
                <p>Form data otentikasi guru</p>
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
              <p>Form data profil guru</p>
              <Col md={6}>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleChange}
                    className="mb-2 me-2"
                    placeholder="Nama lengkap"
                  />
                  <Form.Control
                    type="text"
                    name="gelar"
                    value={formData.gelar}
                    onChange={handleChange}
                    className="mb-2"
                    placeholder="Gelar"
                  />
                </div>
                <Form.Control
                  type="text"
                  maxLength={16}
                  name="nuptk"
                  value={formData.nuptk}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="nuptk"
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
                <Form.Control
                  type="text"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Jabatan"
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
};

export default Create;
