import Main from "../layouts/client/Main";
import { Button, Carousel, Col, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "./api/config/api";
import { useRouter } from "next/router";

const Home = () => {
  const [promosi, setPromosi] = useState();
  const router = useRouter();

  const getPromosi = async () => {
    await api
      .get("promosi/all/client")
      .then((response) => {
        console.log(response.data.data);
        const promosiBucket = [];
        promosiBucket.push(response.data.data);
        setPromosi(promosiBucket);
      })
      .catch((err) => console.log(err));
  };

  const toDetail = () => {
    router.push({
      pathname: "/promosi/detail",
      query: { promosi: JSON.stringify(promosi) },
    });
  };

  useEffect(() => {
    getPromosi();
  }, []);
  return (
    <Main>
      <Row className="mt-5">
        <Col sm={12} md={6}>
          <Image
            src="https://img.freepik.com/free-vector/tired-overworked-secretary-accountant-working-laptop-near-pile-folders-throwing-papers-vector-illustration-stress-work-workaholic-busy-office-employee-concept_74855-13264.jpg?w=1380&t=st=1682149748~exp=1682150348~hmac=04e995215f7a2b60ddd563354267fb550d4d75dacdac22f43846431cf0ba9bd0"
            className="img-fluid"
            alt="ilustrasi"
          />
        </Col>
        <Col sm={12} md={6}>
          <h1 className="fw-bold">
            Karya Siswa SMK Pariwisata Islam Terpadu Nurul Imam
          </h1>
          <p className="lead">
            Website ini mempersembahkan karya-karya inspiratif dari para siswa
            SMK Pariwisata Islam Terpadu Nurul Imam, yang memadukan keahlian
            dalam bidang pariwisata dengan kreativitas yang memukau. Melalui
            berbagai proyek dan kegiatan, siswa-siswa kami telah berhasil
            menciptakan karya-karya yang tidak hanya memukau mata, tetapi juga
            memperkenalkan inspirasi kepada masyarakat luas. Dari video kreatif,
            desain grafis dan karya tulis siswa.
          </p>
          <Button className="rounded-pill pt-2 pb-2 ps-4 pe-4">
            Selengkapnya
          </Button>
        </Col>
      </Row>
      <Carousel className="mt-3" interval={3000}>
        {promosi &&
          promosi.map((item, index) => (
            <Carousel.Item key={index}>
              <Row>
                <Col md={6}>
                  <Image
                    className="d-block w-100 rounded img-fluid"
                    src={item.gambar}
                    alt={item.title}
                    onClick={() => toDetail()}
                  />
                </Col>
                <Col md={6}>
                  <h1 className="fw-bold">Promosi Sekolah</h1>
                  <h2>{item.nama_promosi}</h2>
                  <p>{item.keterangan}</p>
                  <span className="badge badge-warning"></span>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
      </Carousel>
    </Main>
  );
};

export default Home;
