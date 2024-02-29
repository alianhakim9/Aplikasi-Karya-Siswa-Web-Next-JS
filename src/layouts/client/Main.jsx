import Head from "next/head";
import Navbar from "../../components/client/Navbar";
import MyFooter from "../../components/client/Footer";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Main = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;
  return (
    <>
      <Head>
        <title>SMK Pariwisata Islam Terpadu Nurul Imam</title>
      </Head>
      <Navbar />
      <motion.main
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: "linear" }} // Set the transition to linear
        className=""
      >
        <Container className="mt-5 pt-5 mb-5 pb-5">{children}</Container>
      </motion.main>
      <MyFooter data />
    </>
  );
};

export default Main;
