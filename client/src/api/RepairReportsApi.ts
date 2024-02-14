import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
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

export default {
  getLatestRepairs,
  searchForRepair,
  getRepairById,
};
