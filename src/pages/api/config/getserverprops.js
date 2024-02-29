import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export async function getServerSideProps() {
  const token = Cookies.get("token");

  if (!token) {
    return {
      redirect: {
        destination: "/admin/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
