import { useEffect, useState } from "react";
import api from "../../../api/config/api";
import { Button, Container, Pagination, Table } from "react-bootstrap";
import Main from "../../../../layouts/Main";
import Link from "next/link";
import {
  PlusCircle,
  Trash,
  Whatsapp,
  Pencil,
  Envelope,
  FileEarmarkExcel,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";
import DeleteModal from "../../../../components/admin/DeleteModal";
import HeaderAdmin from "../../../../components/admin/HeaderAdmin";
import LoadingAdmin from "../../../../components/admin/LoadingAdmin";
import SendEmailModal from "../../../../components/client/SendEmailModal";
import ImportModal from "../../../../components/admin/ImportModal";

export default function Index() {
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataSiswa, setdataSiswa] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);
  const [id, setId] = useState(0);
  const router = useRouter();

  const fetchData = async () => {
    isLoading(true);
    await api
      .get("manajemen-siswa/", {
        params: {
          page: currentPage,
        },
      })
      .then((response) => {
        isLoading(false);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setdataSiswa(response.data.data);
      })
      .catch((err) => {
        isLoading(false);
        setError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const edit = (id) => {
    router.push({
      pathname: "/admin/manajemen_user/siswa/update/[id]",
      query: { id: id },
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = dataSiswa.filter((item) =>
    item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDelete = (id) => {
    setId(id);
    setShowModal(true);
  };

  const onKirim = (namaLengkap, email, password) => {
    setNamaLengkap(namaLengkap);
    setEmail(email);
    setPassword(password);
    setShowEmailModal(true);
  };

  const importExcel = () => {
    setShowImportModal(true);
  };

  return (
    <>
      <Main>
        <Container>
          <HeaderAdmin loading={loading} title="siswa" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control mb-2 w-50"
            placeholder="Cari siswa berdasarkan nama..."
          />
          <div className="float-end mb-3">
            <Button
              variant="btn"
              className="btn-success "
              onClick={() => importExcel()}
            >
              Import data dari excel <FileEarmarkExcel />
            </Button>
          </div>
          {loading ? (
            <LoadingAdmin />
          ) : (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama lengkap</th>
                    <th>NISN</th>
                    <th>Email</th>
                    <th>Agama</th>
                    <th>Jenis kelamin</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nama_lengkap}</td>
                      <td>{item.nisn}</td>
                      <td>{item.user.email}</td>
                      <td>{item.agama}</td>
                      <td>{item.jenis_kelamin}</td>
                      <td>
                        <div className="d-flex">
                          <Button variant="link" className="text-info p-0 me-2">
                            <Envelope
                              onClick={() =>
                                onKirim(
                                  item.nama_lengkap,
                                  item.user.email,
                                  12345678
                                )
                              }
                            />
                          </Button>
                          <Button
                            variant="link"
                            className="text-info p-0 me-2"
                            onClick={() => edit(item.id)}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="link"
                            className="text-danger p-0"
                            onClick={() => onDelete(item.id)}
                          >
                            <Trash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Link href="/admin/manajemen_user/siswa/create/" legacyBehavior>
                <Button
                  className="float-end"
                  variant="outline-primary rounded-pill ps-4 pe-4"
                >
                  <PlusCircle className="me-1"></PlusCircle> Tambah akun siswa
                </Button>
              </Link>
              <Pagination>
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
              <DeleteModal
                show={showModal}
                onHide={() => setShowModal(false)}
                id={id}
                fetchData={fetchData} // menambahkan prop fetchData ke dalam DeleteModal
                url="manajemen-siswa/hapus-siswa"
              />
              <SendEmailModal
                show={showEmailModal}
                onHide={() => setShowEmailModal(false)}
                namaLengkap={namaLengkap}
                email={email}
                password={password}
              />
              <ImportModal
                show={showImportModal}
                fetchData={fetchData} // menambahkan prop fetchData ke dalam DeleteModal
                onHide={() => setShowImportModal(false)}
                url="manajemen-siswa/import"
              />
            </>
          )}
        </Container>
        <br />
      </Main>
    </>
  );
}
