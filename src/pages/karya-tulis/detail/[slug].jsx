import { useRouter } from "next/router";
import Main from "../../../layouts/client/Main";
import api from "../../api/config/api";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";

const Detail = (props) => {
  const router = useRouter();
  const slug = router.query.slug;
  const [visible, setVisible] = useState(4);
  const [data, setData] = useState({
    karya_tulis: {
      id: 0,
      judul_karya: "",
      konten_karya: "",
      sumber: "",
      slug: "",
      komentar_count: 0,
      like_count: 0,
      siswa: {
        id: 0,
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

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  const [loading, isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getDetail = async () => {
    await api
      .get(`karya-tulis/${slug}`)
      .then((response) => {
        isLoading(false);
        setData(response.data);
        setCurrentPage(response.data.komentar.current_page);
        setLastPage(response.data.komentar.last_page);
      })
      .catch((err) => {
        isLoading(false);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getDetail();
    }
  }, [router.isReady, currentPage]);
  return (
    <>
      <Main>
        <Row className="justify-content-center mt-5">
          <Col md={7}>
            <button
              className="btn btn-info rounded-pill pt-0 pb-0 mb-4"
              onClick={() => router.back()}
            >
              <small>Kembali</small>
            </button>
            <h1 className="fw-bold">{data.karya_tulis.judul_karya}</h1>
            <p>
              <small>
                Oleh : &nbsp;
                <span className="text-muted">
                  {data.karya_tulis.siswa.nama_lengkap}
                </span>
              </small>
            </p>

            <div
              dangerouslySetInnerHTML={{
                __html: data.karya_tulis.konten_karya,
              }}
            />
            <div className="d-flex align-items-center mt-3 mb-3">
              <HeartFill color="red" />
              <span className="mb-0 ms-2"> {data.karya_tulis.like_count}</span>
              &nbsp; Suka
            </div>
          </Col>
          <hr className="d-sm-block d-md-none" />
          <Col md={3} style={{ right: 0, zIndex: 1 }}>
            <div style={{ height: "400px", overflow: "auto" }}>
              <p>
                Komentar &nbsp;
                <span>
                  <small className="fw-bold">
                    ({data.karya_tulis.komentar_count})
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
