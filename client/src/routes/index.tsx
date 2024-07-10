import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import LatestRepairsPage from "../pages/LatestRepairsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RepairFormPage from "../pages/CreateRepairFormPage";
import DashboardPage from "../pages/dashboard/DashboardPageContainer";
import { RepairInfoPageContainer } from "../pages/RepairInfoPageContainer";
import EditRepairPageV2 from "../pages/EditRepairPageV2";

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
    path: "/repair/edit/:id",
    element: (
      <Layout>
        <EditRepairPageV2 />
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
