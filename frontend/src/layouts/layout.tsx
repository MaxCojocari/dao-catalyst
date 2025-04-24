import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Header, Footer, Loader } from "../components";
import { useUnit } from "effector-react";
import { $isLoading } from "../store";
import { TEST_DAO_INFO as dao } from "../constants";
import { useAccount } from "wagmi";

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoading = useUnit($isLoading);
  const { isConnected } = useAccount();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    if (isConnected) {
      navigate("/daos");
    } else {
      navigate("/auth");
    }
    setChecked(true);
  }, [isConnected]);

  if (!checked) return null;

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
