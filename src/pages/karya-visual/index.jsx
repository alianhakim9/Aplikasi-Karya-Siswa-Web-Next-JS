import {
  Badge,
  Button,
  Card,
  Col,
  Image,
  Pagination,
  Row,
} from "react-bootstrap";
import Main from "../../layouts/client/Main";
import { useEffect, useState } from "react";
import api from "../api/config/api";
import {
  BrushFill,
  Chat,
  ChatFill,
  CheckCircleFill,
  Heart,
  HeartFill,
  PlayFill,
  XLg,
} from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Loading } from "@nextui-org/react";
import HeadingKarya from "../../components/client/HeadingKarya";
import { useRouter } from "next/router";

const Index = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState(null);
  const [badgeClicked, setBadgeClicked] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [kategori, setKategori] = useState([]);
  const router = useRouter();

  const filter = (value) => {
    setSearchTerm(value);
    setBadgeClicked(true);
    setSelectedBadge(value);
  };

  const clearFilter = () => {
    setSearchTerm("");
    setSelectedBadge(null);
    setBadgeClicked(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    await api
      .get("karya-visual/all", {
        params: {
          page: currentPage,
        },
      })
      .then((response) => {
        setError(null);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setData(response.data.data);
        setIsLoading(false);
        console.table(response.data);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const getKategoriKaryaCitra = async () => {
    await api
      .get("/kategori/karya-citra/all")
      .then((response) => setKategori(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    getKategoriKaryaCitra();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredItems = data.filter((item) =>
    item.kategori_karya_citra_id
      .toString()
      .toLowerCase()
      .includes(searchTerm.toString().toLowerCase())
  );

  const toDetail = (slug) => {
    router.push({
      pathname: "/karya-visual/detail/[slug]",
      query: { slug: slug },
    });
  };

  return (
    <Main>
      <HeadingKarya
        title="Karya visual"
        subTitle="Berikut ini adalah berbagai macam karya visual yang telah dibuat oleh siswa SMK Pariwisata Islam Terpadu Nurul Imam, terdiri dari karya citra gambar dan video, karya-karya ini juga menampilkan kreativitas dan keahlian siswa dalam mengolah teknologi digital untuk menciptakan pengalaman visual yang memukau."
        icon={<BrushFill size={40} />}
      />
      <div className="d-flex justify-content-between align-items-center">
        <div className="m-auto">
          {kategori.map((item, i) => (
            <Badge
              pill
              bg={selectedBadge === item.id ? "primary" : "secondary"}
              style={{
                cursor: "pointer",
              }}
              onClick={() => filter(item.id)}
              key={i}
              className="me-3"
            >
              <span>{item.nama_kategori}</span>
            </Badge>
          ))}
        </div>
        {badgeClicked ? (
          <Button
            variant="danger"
            onClick={() => clearFilter()}
            size="sm rounded-pill pt-0 pb-0 ps-4 pe-4"
          >
            <XLg className="me-2 mb-1 mt-1" />
            Hapus filter{" "}
          </Button>
        ) : null}
      </div>

      {isLoading ? (
        <Loading
          type="points"
          size="md"
          style={{
            margin: "auto",
            width: "100%",
          }}
        >
          Sedang mengambil data...
        </Loading>
      ) : (
        <Row className="mt-3">
          {filteredItems &&
            filteredItems.map((item, i) => (
              <Col md={3} key={i}>
                <Card className="rounded border-0 shadow-sm">
                  <Card.Body className="bg-light rounded  text-dark rounded">
                    <div
                      className="d-flex align-items-center overflow-hidden"
                      style={{
                        height: "200px",
                      }}
                    >
                      {item.format !== "mp4" ? (
                        <OverlayTrigger
                          placement="auto"
                          overlay={
                            <Tooltip id={`tooltip-${i}`}>
                              {item.nama_karya}
                            </Tooltip>
                          }
                        >
                          <Image
                            src={item.karya}
                            style={{
                              objectFit: "cover",
                              height: "100%",
                              width: "100%",
                              cursor: "pointer",
                            }}
                            className="rounded"
                            onClick={() => toDetail(item.slug)}
                            alt="karya"
                          />
                        </OverlayTrigger>
                      ) : (
                        <>
                          <video
                            className="img-fluid"
                            style={{
                              cursor: "pointer",
                              borderRadius: "10px",
                            }}
                            onClick={() => toDetail(item.slug)}
                            autoPlay
                            muted
                          >
                            <source src={item.karya} type="video/mp4" />
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
                    </div>
                    <p>
                      <small className="fw-bold">{item.nama_karya}</small>
                    </p>
                    <div className="d-flex justify-content-between">
                      <span>
                        <small>
                          <span className="text-primary">
                            {item.siswa.nama_lengkap}{" "}
                            <CheckCircleFill className="ms-1" />
                          </span>
                        </small>
                      </span>
                      <div>
                        <span className="me-1">
                          <HeartFill color="red" /> {item.like_count}
                        </span>
                        <span className="ms-1">
                          <ChatFill color="primary" /> {item.komentar_count}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          {filteredItems.length === 0 ? (
            <div className="text-center mt-5">
              <Image
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1682479982~exp=1682480582~hmac=220112af6e8822e2ea6f0677e35a0bbd6033724cb2e851121454b7e6a10c75fa"
                width={200}
                alt="ilustrasi"
              />
              <h6>Karya dengan kategori ini belum ada</h6>
            </div>
          ) : null}
        </Row>
      )}
      {lastPage !== 1 ? (
        <div className="d-flex justify-content-center">
          <Pagination className="mt-4">
            {Array.from({ length: lastPage }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </div>
      ) : null}
    </Main>
  );
};

export default Index;
