import Link from "next/link";
import { Button } from "react-bootstrap";
import { House } from "react-bootstrap-icons";

const HeaderAdmin = (props) => {
  const { loading, title } = props;
  return (
    <>
      <Link href="/admin/manajemen_user/" className="mb-2 d-block">
        <Button>
          <House size={30} />
        </Button>
      </Link>
      <h1 className="fw-bold">Halaman dashboard akun {title}</h1>
      <p>
        Berikut ini adalah data akun {title} pada aplikasi karya siswa SMK Islam
        Terpadu Nurul Imam
      </p>
    </>
  );
};

export default HeaderAdmin;
