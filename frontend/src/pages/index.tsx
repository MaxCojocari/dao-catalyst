import { Header } from "../components";
import { TEST_DAO_IMGAGE_URL, TEST_DAO_NAME } from "../constants";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateDaoPage } from "./create-dao";
import { CreateProposalPage } from "./dao/create-proposal";
import { DashboardPage } from "./dao/dashboard";
import { FinancePage } from "./dao/finance";
import { GovernancePage } from "./dao/governance";
import { MembersPage } from "./dao/members";
import { ProposalDetailsPage } from "./dao/proposal-details";
import { HomePage } from "./home";
import { NotFoundPage } from "./not-found";
import { SettingsPage } from "./dao/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create-dao",
    element: <CreateDaoPage />,
  },
  {
    path: "/daos/:daoAddress",
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "governance", element: <GovernancePage /> },
      { path: "finance", element: <FinancePage /> },
      { path: "members", element: <MembersPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "create-proposal", element: <CreateProposalPage /> },
      { path: "proposals/:id", element: <ProposalDetailsPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  // return (
  //   <>
  //     <Header
  //       props={{
  //         isDaoMainPage: true,
  //         imageUri: TEST_DAO_IMGAGE_URL,
  //         daoName: TEST_DAO_NAME,
  //       }}
  //     />
  //   </>
  // );
  return <RouterProvider router={router} />;
}

export default App;
