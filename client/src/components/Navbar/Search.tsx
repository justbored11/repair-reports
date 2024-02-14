import React, { useState } from "react";
import useRepairApi from "../../hooks/useRepairApi";

export default function Search(): React.ReactNode {
  const { searchForRepair } = useRepairApi();

  const [search, setSearch] = useState("");
  const handleSearch = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("search", search);
    const results = await searchForRepair(search);
    console.log("results", results);
  };
  return (
    <form onSubmit={handleSearch}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        name="searchPhrase"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
      />
    </form>
  );
}
