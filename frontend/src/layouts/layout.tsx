import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Header, Footer, Loader } from "../components";
import { useUnit } from "effector-react";
import { $isLoading } from "../store";
import { TEST_DAO_INFO as dao } from "../constants";

const SESSION_DURATION_MS = Number(import.meta.env.VITE_SESSION_DURATION_MS);

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoading = useUnit($isLoading);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const sessionTimestamp = localStorage.getItem("sessionTimestamp");

    // if (
    //   !sessionTimestamp ||
    //   Date.now() - Number(sessionTimestamp) > SESSION_DURATION_MS
    // ) {
    //   localStorage.removeItem("sessionTimestamp");
    //   navigate("/auth");
    // }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Header
        props={{
          imageUri: dao.logo,
          daoName: dao.name,
        }}
      />
      {children}
      <Footer />
    </>
  );
};
