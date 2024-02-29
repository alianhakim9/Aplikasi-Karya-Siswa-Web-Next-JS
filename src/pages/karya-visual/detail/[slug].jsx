import { useRouter } from "next/router";
import Main from "../../../layouts/client/Main";
import api from "../../api/config/api";
import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import {
  CheckCircleFill,
  Heart,
  HeartFill,
  PlayFill,
} from "react-bootstrap-icons";
import { Avatar } from "@nextui-org/react";

const Detail = (props) => {
  const router = useRouter();
  const slug = router.query.slug;
  const [data, setData] = useState({
    karya_citra: {
      nama_karya: "",
      karya: "",
      caption: "",
      format: "",
      siswa: {
        id: "",
        nama_lengkap: "",
        nisn: "",
        foto_profil: "",
      },
    },
    komentar: {
      data: [
        {
          user: {
            email: "",
          },
          siswa: {
            nama_lengkap: "",
          },
          guru: {
            nama_lengkap: "",
          },
        },
      ],
    },
  });
  const [loading, isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [visible, setVisible] = useState(4);

  const getDetail = async () => {
    await api
      .get(`karya-visual/${slug}`)
      .then((response) => {
        isLoading(false);
        setData(response.data);
        setCurrentPage(response.data.komentar.current_page);
        setLastPage(response.data.komentar.last_page);
        console.log(response.data);
      })
      .catch((err) => {
        isLoading(false);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getDetail();
    }
  }, [router.isReady]);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  return (
    <>
      <Main>
        <Row className="md:justify-content-center mt-5">
          <Col xs={7}>
            <Button
              className="btn btn-info rounded-pill pt-0 pb-0 mb-4"
              onClick={() => router.back()}
            >
              <small>Kembali</small>
            </Button>
            <Row className="md:align-items-center">
              <Col sm="6" md="1" lg="1">
                <Avatar
                  src={data.karya_citra.siswa.foto_profil}
                  height={50}
                  className="rounded-circle"
                />
              </Col>
              <Col sm="6">
                <p className="pt-2 pt-md-0">
                  <span className="fw-bold">
                    {data.karya_citra.siswa.nama_lengkap}
                    <CheckCircleFill className="ms-1 text-primary" />
                  </span>
                  <span className="d-block text-muted">
                    <small>{data.karya_citra.siswa.nisn}</small>
                  </span>
                </p>
              </Col>
            </Row>

            <Row>
              <Col lg="6" sm="12" xs="12">
                {data.karya_citra.format !== "mp4" ? (
                  <Image
                    src={data.karya_citra.karya}
                    className="w rounded"
                    alt="karya"
                    priority
                    sizes="(max-width : 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <>
                    <video
                      style={{
                        cursor: "pointer",
                        borderRadius: "10px",
                        maxHeight: "400px",
                        marginTop: "10px",
                      }}
                      autoPlay
                      controls
                      className="img-fluid"
                    >
                      <source src={data.karya_citra.karya} type="video/mp4" />
                    </video>
                    <PlayFill
                      size={30}
                      style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        color: "#fff",
                        zIndex: 1,
                      }}
                    />
                  </>
                )}
              </Col>
              <Col lg="6" sm="12" xs="12">
                <h1 className="fw-bold pt-3 pt-md-0">
                  {data.karya_citra.nama_karya}
                </h1>
                <div className="d-flex align-items-center mt-3 mb-3">
                  <HeartFill color="red" />
                  <span className="mb-0 ms-2 fw-bold">
                    {data.karya_citra.like_count}
                  </span>
                  &nbsp;Suka
                </div>
                <span class="badge text-bg-secondary">
                  {data.karya_citra.nama_kategori}
                </span>
                <p>{data.karya_citra.caption}</p>
              </Col>
            </Row>
          </Col>
          <hr className="d-sm-block d-md-none" />
          <Col md={3} style={{ right: 0 }}>
            <div style={{ height: "400px", overflow: "auto" }}>
              <p>
                Komentar
                <span className="ms-1">
                  <small className="fw-bold">
                    ({data.karya_citra.komentar_count})
                  </small>
                </span>
              </p>
              {data.komentar.data?.slice(0, visible).map((item, i) => (
                <div
                  key={i}
                  className="bg-light mt-2 p-3 rounded shadow-sm mb-1"
                >
                  {item.siswa && (
                    <span className="fw-bold">{item.siswa.nama_lengkap}</span>
                  )}
                  {item.guru && (
                    <span className="fw-bold">{item.guru.nama_lengkap}</span>
                  )}
                  <span
                    className="ms-2"
                    style={{
                      fontSize: "10pt",
                    }}
                  >
                    <small>{item.created_at}</small>
                  </span>
                  <p>
                    <small>
                      Mengatakan : <br />
                    </small>
                    {item.komentar}
                  </p>
                </div>
              ))}
              {data.komentar.data.length !== 0 ? (
                <div className="text-center">
                  <Button
                    className="btn btn-primary rounded-pill pt-0 mt-3 pb-0 ps-4 pe-4 text-center"
                    onClick={showMoreItems}
                  >
                    Load More
                  </Button>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Detail;
