import { useEffect, useState } from "react";

import { AxiosError } from "axios";
import useRepairApi from "./useRepairApi";

export type ProcedureT = {
  images: string[];
  imagesIdArr: string[];
  instructions: string;
  procedureNum: number;
  thumbs: string[];
};
// export type repairDataT = Record<string, string>;
export type repairDataT = {
  boardType: string;
  createdBy: string;
  engineMake: string;
  group: string;
  procedureArr: ProcedureT[];
  removed: boolean;
  title: string;
  visibility: string;
  _id: string;
};

const useGetLatest = (limit: number) => {
  const [repairsData, setRepairsData] = useState<repairDataT[] | []>([]);
  const { getLatestRepairs } = useRepairApi();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getLatestRepairs(limit);
        setRepairsData(response);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log("error", error);
          console.log("error.status", error?.response?.status);
        }
      }
    };

    getData();
  }, []);

  return repairsData;
};

export default useGetLatest;
