import { Button, Modal } from "react-bootstrap";
import api from "../../pages/api/config/api";

const DeleteModal = (props) => {
  const { fetchData, url } = props; // memperoleh fungsi fetchData dari props
  const destroy = async () => {
    await api
      .delete(`${url}/${props.id}`)
      .then(() => {
        fetchData();
        props.onHide();
      })
      .catch((err) => {
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
        <Modal.Title id="contained-modal-title-vcenter">Hapus data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Apakah anda yakin akan menghapus data ini?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Batal</Button>
        <Button onClick={destroy} className="btn-danger">
          Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
