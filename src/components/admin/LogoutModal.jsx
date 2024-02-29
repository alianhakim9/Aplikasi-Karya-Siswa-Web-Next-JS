import { Button, Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { BoxArrowInRight } from "react-bootstrap-icons";

const LogoutModal = (props) => {
  const router = useRouter();
  const onLogout = async () => {
    Cookies.remove("token");
    localStorage.clear();
    router.push("/admin/auth/login");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center p-5">
        <BoxArrowInRight className="me-2" size={50} />
        <h2 className="mt-3">Keluar/Logout</h2>
        <p>Apakah anda yakin akan logout?</p>
      </Modal.Body>
      <Modal.Footer className="text-center m-auto">
        <Button onClick={props.onHide} className="btn-warning">
          Batal
        </Button>
        <Button onClick={onLogout} className="btn-primary">
          Keluar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
