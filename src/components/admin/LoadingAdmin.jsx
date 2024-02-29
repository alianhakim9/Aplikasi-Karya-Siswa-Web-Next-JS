import { Loading } from "@nextui-org/react";

const LoadingAdmin = () => {
  return (
    <div className="d-flex flex-column text-center justify-content-center mt-5 mb-5">
      <Loading />
      <p>Sedang mengambil data...</p>
    </div>
  );
};
export default LoadingAdmin;
