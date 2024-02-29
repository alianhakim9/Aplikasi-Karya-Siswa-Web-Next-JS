import { useEffect, useState } from "react";
import api from "../../../api/config/api";
import { Button, Container, Pagination, Table } from "react-bootstrap";
import Main from "../../../../layouts/Main";
import Link from "next/link";
import {
  FileEarmarkExcel,
  FileExcel,
  Pencil,
  PlusCircle,
  Trash,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";
import DeleteModal from "../../../../components/admin/DeleteModal";
import HeaderAdmin from "../../../../components/admin/HeaderAdmin";
import LoadingAdmin from "../../../../components/admin/LoadingAdmin";
import ImportModal from "../../../../components/admin/ImportModal";

const Index = () => {
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataAdmin, setDataAdmin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [id, setId] = useState(0);
  const router = useRouter();

  const fetchData = async () => {
    isLoading(true);
    await api
      .get("manajemen-akun-admin/", {
        params: {
          page: currentPage,
        },
      })
      .then((response) => {
        isLoading(false);
        setError(null);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setDataAdmin(response.data.data);
      })
      .catch((err) => {
        isLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const edit = (id) => {
    router.push({
      pathname: "/admin/manajemen_user/admin/update/[id]",
      query: { id: id },
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = dataAdmin.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDelete = (id) => {
    setId(id);
    setShowModal(true);
  };

  const importExcel = () => {
    setShowImportModal(true);
  };
  return (
    <>
      <Main>
        <Container>
          <HeaderAdmin loading={loading} title="admin" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control mb-2 w-50"
            placeholder="Cari email..."
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
                    <th>Email</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {error && (
                    <p className="text-danger text-center">
                      <small>{error}</small>
                    </p>
                  )}
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>
                        <div className="d-flex">
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
                            // onClick={() => destroy(item.id)}
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
              <Link href="/admin/manajemen_user/admin/create" legacyBehavior>
                <Button
                  className="float-end"
                  variant="outline-primary rounded-pill ps-4 pe-4"
                >
                  <PlusCircle className="me-1"></PlusCircle> Tambah akun admin
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
                url="manajemen-akun-admin/hapus-admin"
              />
              <ImportModal
                show={showImportModal}
                fetchData={fetchData} // menambahkan prop fetchData ke dalam DeleteModal
                onHide={() => setShowImportModal(false)}
                url="manajemen-akun-admin/import"
              />
            </>
          )}
        </Container>
        <br />
      </Main>
    </>
  );
};

export default Index;
