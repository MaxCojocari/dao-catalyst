import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Header, Footer, Loader } from "../components";
import { useUnit } from "effector-react";
import { $isLoading } from "../store";
import { useAccount } from "wagmi";

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoading = useUnit($isLoading);
  const { isConnected } = useAccount();
  const [checked, setChecked] = useState(false);
  // const { daoAddress } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    if (!isConnected) {
      if (pathname != "/auth") {
        localStorage.setItem("redirectAfterLogin", pathname);
      }
      navigate("/auth");
    }
    setChecked(true);
  }, [isConnected]);

  if (!checked) return null;

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      {children}
      <Footer />
    </>
  );
};
