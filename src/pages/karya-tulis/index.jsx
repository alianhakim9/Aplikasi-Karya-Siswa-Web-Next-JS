import { useEffect, useState } from "react";
import Main from "../../layouts/client/Main";
import api from "../api/config/api";
import { Badge, Col, Pagination, Row, Image, Button } from "react-bootstrap";
import {
  ChatFill,
  CheckCircleFill,
  HeartFill,
  PencilFill,
  XLg,
} from "react-bootstrap-icons";
import { Avatar, Loading } from "@nextui-org/react";
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

  const getKategoriKaryaTulis = async () => {
    await api
      .get("/kategori/karya-tulis/all")
      .then((response) => setKategori(response.data.data))
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    setIsLoading(true);
    await api
      .get("karya-tulis/all", {
        params: {
          page: currentPage,
        },
      })
      .then((response) => {
        setError(null);
        setIsLoading(false);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setData(response.data.data);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    getKategoriKaryaTulis();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredItems = data.filter((item) =>
    item.kategori_karya_tulis_id
      .toString()
      .toLowerCase()
      .includes(searchTerm.toString().toLowerCase())
  );

  const toDetail = (slug) => {
    router.push({
      pathname: "/karya-tulis/detail/[slug]",
      query: { slug: slug },
    });
  };

  return (
    <Main>
      <HeadingKarya
        title="Karya tulis"
        subTitle="Berikut ini adalah berbagai macam karya tulis yang telah dibuat oleh siswa SMK Pariwisata Islam Terpadu Nurul Imam Dari berbagai macam karya tulis yang telah dibuat oleh siswa SMK Pariwisata Islam Terpadu Nurul Imam, kami berharap karya-karya tersebut dapat memberikan wawasan dan inspirasi bagi siapapun yang membacanya."
        icon={<PencilFill size={40} />}
      />
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-center m-auto">
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
        <>
          <Row>
            {filteredItems &&
              filteredItems.map((item, i) => (
                <Col md={3} key={i}>
                  <div className="pt-2">
                    <div className="d-flex mt-4">
                      <Avatar
                        src={item.siswa.foto_profil}
                        height={50}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <h6 className="text-truncat">
                          <span className="fw-bold">
                            {item.siswa.nama_lengkap}
                            <CheckCircleFill className="ms-1 text-primary" />
                          </span>
                          <br />
                          <span className="text-muted">
                            <small>{item.created_at}</small>
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div>
                      <p className="fw-bold text-muted">
                        <small>
                          Siswa SMK Pariwisata Islam Terpadu Nurul Imam
                        </small>
                      </p>
                      <h3 className="text-truncate">{item.judul_karya}</h3>
                      <p className="text-muted">
                        <small>{item.excerpt}</small>
                      </p>
                      <HeartFill color="red" /> {item.like_count}
                      <ChatFill className="ms-2" color="black" />{" "}
                      {item.like_count}
                      <span
                        className="text-primary pointer nav-link mt-3"
                        onClick={() => toDetail(item.slug)}
                        style={{ cursor: "pointer" }}
                      >
                        <small>Selengkapnya</small>
                        <hr />
                      </span>
                    </div>
                  </div>
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
        </>
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
