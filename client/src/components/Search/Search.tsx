import React, { useState } from "react";
import useRepairApi from "../../hooks/useRepairApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search(): React.ReactNode {
  const { searchForRepair } = useRepairApi();
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const handleSearch = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.append("search", search);

    const navigateTo = `/search?${searchParams.toString()}`;
    const currentLoc = `${location.pathname}${location.search}`;

    //only navigate to search page if current page is not the same
    if (navigateTo == currentLoc) {
      return;
    }

    console.log("location.pathname", location.pathname);
    console.log("location.search", location.search);

    navigate(navigateTo);
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
