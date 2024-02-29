import { Button, Modal } from "react-bootstrap";
import api from "../../pages/api/config/api";
import { Loading } from "@nextui-org/react";
import { useState } from "react";

const SendEmailModal = (props) => {
  const { namaLengkap, email, password } = props;
  const [loading, setLoading] = useState(false);
  const send = async () => {
    setLoading(true);
    await api
      .post("kirim/akun", {
        nama_lengkap: namaLengkap,
        email: email,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        props.onHide();
      })
      .catch((err) => {
        setLoading(true);
        fetchData();
        props.onHide();
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
          Kirim akun via email
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Apakah data yang akan dikirim sudah benar?</p>
        <ul>
          <li>
            <small>
              Nama lengkap : <span className="fw-bold">{namaLengkap}</span>
            </small>
          </li>
          <li>
            <small>
              Email : <span className="fw-bold">{email}</span>
            </small>
          </li>
          <li>
            <small>
              Password : <span className="fw-bold">12345678</span>
            </small>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        {loading ? <Loading type="points" /> : null}
        <Button onClick={props.onHide} className="btn-info">
          Batal
        </Button>
        <Button onClick={send} className="btn-primary">
          Kirim
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendEmailModal;
