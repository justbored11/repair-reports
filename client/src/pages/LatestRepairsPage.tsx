import RepairList from "../components/RepairList/RepairList";
import React from "react";
import useGetLatest from "../hooks/useGetLatest";

export default function LatestRepairsPage(): React.ReactNode {
  //todo get latest repairs

  const repairs = useGetLatest(8);

  return (
    <div className="center-block w-full">
      <RepairList repairList={repairs} />
    </div>
  );
}
