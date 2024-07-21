import { useEffect, useState } from "react";
import useRequestErrorHandler from "./useRequestErrorHandler";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

export type UserGroupDataT = {
  _id: string;
  userId: string;
  username: string;
  role: string[];
  groupId: string;

  groupName: string;
};

export default function useGetUserGroups() {
  const [groups, setGroups] = useState<UserGroupDataT[]>([]);
  const [error, setError] = useState<string[]>([]);
  const handler = useRequestErrorHandler();

  const getUserGroups = async () => {
    try {
      const foundGroups = await handler(fetchUserGroupData);
      // const foundGroups = await handler(fetchUserGroupData);

      if (foundGroups && foundGroups.length) setGroups(foundGroups);
    } catch (error) {
      console.log("failed to get user group memberships", error);
      setError(["failed to get groups memberships"]);
    }
  };

  useEffect(() => {
    getUserGroups();
  }, []);

  return { data: groups, fetchData: getUserGroups, error };
}

async function fetchUserGroupData(): Promise<UserGroupDataT[]> {
  const result = await axios.get(`${API_URL}/api/groups`, {
    withCredentials: true,
  });

  return result.data;
}
