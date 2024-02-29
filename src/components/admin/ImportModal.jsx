import { Button, Modal } from "react-bootstrap";
import api from "../../pages/api/config/api";
import { useState } from "react";
import { Loading } from "@nextui-org/react";

const ImportModal = (props) => {
  const { fetchData, url } = props; // memperoleh fungsi fetchData dari props
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const importFile = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true);
    await api
      .post(`${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setLoading(false);
        fetchData();
        props.onHide();
      })
      .catch((err) => {
        setLoading(false);
        alert("import file gagal, silahkan coba lagi");
        console.log(err);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Import Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Pastikan data yang akan diimport sudah sesuai</p>
        <input type="file" name="excel" onChange={handleFileChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="btn-info" disabled={loading}>
          Batal
        </Button>
        {loading ? (
          <Loading />
        ) : (
          <Button
            className="btn-primary"
            onClick={importFile}
            disabled={selectedFile === null}
          >
            Import
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ImportModal;
