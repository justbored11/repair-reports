import { repairDataT } from "../../../types";
import { RepairCard } from "./RepairCard";
import { v4 as uuidv4 } from "uuid";

interface latestRepairsProps {
  repairList: repairDataT[];
}

export default function RepairList({
  repairList,
}: latestRepairsProps): React.ReactNode {
  const repairs = repairList.map((data) => {
    return (
      <li className="w-full p-1 sm:w-1/3 md:w-1/4">
        <RepairCard
          key={uuidv4()}
          data={data}
        />
      </li>
    );
  });
  return <ul className="flex flex-wrap gap-0 justify-center ">{repairs}</ul>;
}
