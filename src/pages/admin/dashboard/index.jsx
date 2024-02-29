import { Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import Main from "../../../layouts/Main";
import { useEffect, useState } from "react";
import api from "../../api/config/api";
import { Loading } from "@nextui-org/react";

export default function Dashboard() {
  const [count, setCount] = useState({
    count_karya_tulis: 0,
    count_karya_citra: 0,
    count_akun_siswa: 0,
    count_akun_guru: 0,
    count_akun_tim: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const jumlahAkun = [
    { total: count.count_akun_siswa, title: "akun siswa" },
    { total: count.count_akun_guru, title: "akun guru" },
    { total: count.count_akun_tim, title: "akun tim ppdb" },
  ];

  const jumlahKarya = [
    { total: count.count_karya_citra, title: "karya citra" },
    { total: count.count_karya_tulis, title: "karya tulis" },
  ];
  const fetchData = async () => {
    setIsLoading(true);
    await api
      .get("count")
      .then((response) => {
        setCount({
          count_karya_tulis: response.data.count_karya_tulis,
          count_karya_citra: response.data.count_karya_citra,
          count_akun_tim: response.data.akun_tim,
          count_akun_siswa: response.data.akun_siswa,
          count_akun_guru: response.data.akun_guru,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Main>
        <Container>
          <header>
            <h1>Halo, Selamat datang di halaman dashboard admin</h1>
            <p className="lead">SMK Pariwisata Islam Terpadu Nurul Imam</p>
          </header>

          <main>
            <Row>
              <Col md={6}>
                <Card className="rounded p-5 mt-5">
                  <h5>Jumlah akun</h5>
                  <Row>
                    {jumlahAkun.map((item, i) => (
                      <Col md={4} key={i}>
                        {isLoading ? (
                          <Loading type="spinner" size="lg" />
                        ) : (
                          <h2 className="fw-bold">{item.total}</h2>
                        )}
                        <p>{item.title}</p>
                      </Col>
                    ))}
                  </Row>
                  <h5 className="mt-5">Jumlah karya</h5>
                  <Row>
                    {jumlahKarya.map((item, i) => (
                      <Col md={4} key={i}>
                        {isLoading ? (
                          <Loading type="spinner" size="lg" />
                        ) : (
                          <h2 className="fw-bold">{item.total}</h2>
                        )}
                        <p>{item.title}</p>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
              <Col md={6}>
                <Image
                  src="/img/dashboard.jpg"
                  className="img-fluid"
                  alt="dashboard"
                />
              </Col>
            </Row>
          </main>
        </Container>
      </Main>
    </>
  );
}
