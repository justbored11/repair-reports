import axios from "axios";
import { repairDataT } from "../hooks/useGetLatest";
const API_URL = import.meta.env.VITE_API_URL;

type signatureT = {
  apikey: string;
  cloudname: string;
  signature: string;
  timestamp: number;
};

const getLatestRepairs = async (limit: string | number) => {
  // const response = await axios.get(`http://localhost:8000/api/repairs`, {
  const response = await axios.get(`${API_URL}/api/repairs`, {
    withCredentials: true,
    params: { num: limit },
  });

  return response.data.repairs;
};
const searchForRepair = async (phrase: string) => {
  const response = await axios.post(
    `http://localhost:8000/api/repairs`,
    { searchPhrase: phrase },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getRepairById = async (repairId: string) => {
  console.log("repairId", repairId);
};

const getUploadSignature = async () => {
  const response = await axios.get(`${API_URL}/api/signform`, {
    withCredentials: true,
  });
  return response.data as signatureT;
};

const updateRepair = async (repair: repairDataT) => {
  let signature = undefined;
  try {
    signature = await getUploadSignature();
  } catch (err: unknown) {
    if (err instanceof Error && err?.message) {
      throw new Error(`signature error : ${err?.message}`);
    }

    throw new Error(`unspecified signature error`);
  }

  console.log("signature", signature);
  console.log("repair @updateRepair ", repair);

  try {
    const response = await axios.put(
      `${API_URL}/api/repairs`,
      { repairData: repair },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    if (err instanceof Error && err?.message) {
      throw new Error(`PUT error ${API_URL}/api/repairs : ${err?.message}`);
    }

    throw new Error(`unspecified PUT error ${API_URL}/api/repairs`);
  }
};

export default {
  updateRepair,

  getLatestRepairs,
  searchForRepair,
  getRepairById,
};
