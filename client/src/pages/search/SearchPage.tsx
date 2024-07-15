import { useSearchParams } from "react-router-dom";
import RepairList from "../../components/RepairList/RepairList";
import useRepairApi from "../../hooks/useRepairApi";
import { useEffect, useState } from "react";
import { RepairDataT } from "../../../types";

export default function SearchPage() {
  const { searchForRepair } = useRepairApi();
  const [searchParams] = useSearchParams();
  const [repairsFound, setRepairsFound] = useState<RepairDataT[]>([]);

  //todo add limit and page number to request
  // const limit = searchParams.get("limit") || 10;
  // const page = searchParams.get("page") || 1;
  const search = searchParams.get("search");

  async function getSearchResults(search: string) {
    const results = await searchForRepair(search);

    console.log("results", results);
    if (results) {
      setRepairsFound(results);
    }
  }

  useEffect(() => {
    if (search) {
      getSearchResults(search);
    }
  }, [searchParams]);

  if (!search) {
    return (
      <div>
        <p>No search phrase provided</p>
      </div>
    );
  }

  return (
    <div>
      <p>Search Results for {search}</p>
      <RepairList repairList={repairsFound} />
    </div>
  );
}
