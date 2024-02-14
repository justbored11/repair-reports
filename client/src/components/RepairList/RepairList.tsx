import { repairDataT } from "../../hooks/useGetLatest";
import { RepairCard } from "./RepairCard";
interface latestRepairsProps {
  repairList: repairDataT[];
}

export default function RepairList({
  repairList,
}: latestRepairsProps): React.ReactNode {
  const repairs = repairList.map((data) => {
    return (
      <li className="w-1/4">
        <RepairCard
          key={Math.random() * 514}
          data={data}
        />
      </li>
    );
  });
  return <ul className="flex flex-wrap gap-3 justify-center ">{repairs}</ul>;
}
