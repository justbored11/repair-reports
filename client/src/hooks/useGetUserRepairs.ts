import { useState } from "react";

import { RepairDataT } from "../../types";
import useRepairApi from "./useRepairApi";

const useGetUserRepairs = () => {
  const [repairsData, setRepairsData] = useState<RepairDataT[] | []>([]);

  const { getUsersRepairs } = useRepairApi();

  const getData = async (limit?: number, page?: number) => {
    const response = await getUsersRepairs(limit, page);
    setRepairsData(response);
  };

  return { repairsData, getData };
};

export default useGetUserRepairs;
