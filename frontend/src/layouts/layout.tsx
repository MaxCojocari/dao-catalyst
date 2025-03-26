import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Header, Footer, Loader } from "../components";
import { useUnit } from "effector-react";
import { $isLoading } from "../store";
import { TEST_DAO_IMGAGE_URL, TEST_DAO_NAME } from "../constants";

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

  const isLoading = useUnit($isLoading);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      {isLoading && <Loader />}
      <Header
        props={{
          imageUri: TEST_DAO_IMGAGE_URL,
          daoName: TEST_DAO_NAME,
        }}
      />
      {children}
      <Footer />
    </>
  );
};
