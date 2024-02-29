import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Main from "../../layouts/client/Main";

const Detail = () => {
  const router = useRouter();
  const { promosi } = router.query;
  const detailPromosi = promosi ? JSON.parse(promosi) : null;
  useEffect(() => {
    if (!detailPromosi) {
      router.push("/");
    }
  });

  return (
    <Main>
      {detailPromosi && (
        <Row className="mt-4">
          <Col>
            <Image
              src={detailPromosi.gambar}
              className="rounded w-100 img-fluid"
              alt="promosi"
            />
            <p className="text-end text-muted">
              <small>{detailPromosi.tanggal_promosi}</small>
            </p>
            <h1 className="mt-3">{detailPromosi.nama_promosi}</h1>
            <p className="text-muted">{detailPromosi.keterangan}</p>
          </Col>
        </Row>
      )}
    </Main>
  );
};

export default Detail;
