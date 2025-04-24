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
import { WalletConnectPage } from "./wallet-connect";
import { DaoExplorerPage } from "./dao-explorer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6666FF",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "17px",
          letterSpacing: "-0.03em",
          color: "rgba(41, 41, 51, 0.9)",
          padding: "31px 24px",
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <WalletConnectPage />
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
        <WalletConnectPage />
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
  {
    path: "404-page",
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
