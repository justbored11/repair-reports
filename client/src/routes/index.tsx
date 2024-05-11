import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import LatestRepairsPage from "../pages/LatestRepairsPage";
import ProfilePage from "../pages/ProfilePage";
import RepairFormPage from "../pages/RepairFormPage";
import DashboardPage from "../pages/dashboard/DashboardPageContainer";
import { RepairInfoPageContainer } from "../pages/RepairInfoPageContainer";
import EditRepairPage from "../pages/EditRepairPage";

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
        <RepairFormPage />
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
        <RepairInfoPageContainer />
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
