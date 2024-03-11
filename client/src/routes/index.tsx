import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import LatestRepairsPage from "../pages/LatestRepairsPage";
import ProfilePage from "../pages/ProfilePage";
import RepairFormPage from "../pages/RepairFormPage";
import DashboardPage from "../pages/DashboardPage";
import { RepairInfoPage } from "../pages/RepairInfoPage";
import EditRepairPage from "../pages/EditRepairPage";
import { RepairFormContextProvider } from "../context/RepairFormContext";

export const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: (
      <Layout>
        <LatestRepairsPage />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <DashboardPage />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <ProfilePage />
      </Layout>
    ),
  },
  {
    path: "/repairform",
    element: (
      <Layout>
        <RepairFormContextProvider>
          <RepairFormPage />
        </RepairFormContextProvider>
      </Layout>
    ),
  },

  // edit repair
  {
    path: "/repair/edit/:repair_id",
    element: (
      <Layout>
        <EditRepairPage />
      </Layout>
    ),
  },
  {
    path: "/repair/:repair_id",
    element: (
      <Layout>
        <RepairInfoPage />
      </Layout>
    ),
  },
  {
    path: "/react",
    element: (
      <Layout>
        <LatestRepairsPage />
      </Layout>
    ),
  },
]);
