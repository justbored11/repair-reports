import { useEffect, useState } from "react";

import { RepairDataT } from "../../types";
import useRepairApi from "./useRepairApi";

const useGetLatest = (limit: number) => {
  const [repairsData, setRepairsData] = useState<RepairDataT[] | []>([]);
  const { getLatestRepairs } = useRepairApi();
  useEffect(() => {
    const getData = async () => {
      const response = await getLatestRepairs(limit);
      setRepairsData(response);
    };

    getData();
  }, []);

  return repairsData;
};

export default useGetLatest;
