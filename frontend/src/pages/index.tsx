import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateDaoPage } from "./create-dao";
import { CreateProposalPage } from "./dao/create-proposal";
import { DashboardPage } from "./dao/dashboard";
import { FinancePage } from "./dao/finance";
import { GovernancePage } from "./dao/governance";
import { MembersPage } from "./dao/members";
import { ProposalDetailsPage } from "./dao/proposal-details";
import { NotFoundPage } from "./not-found";
import { SettingsPage } from "./dao/settings";
import { Layout } from "../layouts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material";
import { WalletAuthPage } from "./wallet-auth";
import { DaoExplorerPage } from "./dao-explorer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6666FF",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <WalletAuthPage />
      </Layout>
    ),
  },
  {
    path: "/create-dao",
    element: (
      <Layout>
        <CreateDaoPage />
      </Layout>
    ),
  },
  {
    path: "/auth",
    element: (
      <Layout>
        <WalletAuthPage />
      </Layout>
    ),
  },
  {
    path: "/daos",
    children: [
      {
        path: "",
        element: (
          <Layout>
            <DaoExplorerPage />
          </Layout>
        ),
      },
      {
        path: ":daoAddress",
        children: [
          {
            path: "",
            element: (
              <Layout>
                <DashboardPage />
              </Layout>
            ),
          },
          {
            path: "governance",
            element: (
              <Layout>
                <GovernancePage />
              </Layout>
            ),
          },
          {
            path: "finance",
            element: (
              <Layout>
                <FinancePage />
              </Layout>
            ),
          },
          {
            path: "members",
            element: (
              <Layout>
                <MembersPage />
              </Layout>
            ),
          },
          {
            path: "settings",
            element: (
              <Layout>
                <SettingsPage />
              </Layout>
            ),
          },
          {
            path: "create-proposal",
            element: (
              <Layout>
                <CreateProposalPage />
              </Layout>
            ),
          },
          {
            path: "proposals/:id",
            element: (
              <Layout>
                <ProposalDetailsPage />
              </Layout>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFoundPage />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
