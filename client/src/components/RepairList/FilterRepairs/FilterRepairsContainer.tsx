import { RepairDataT } from "../../../../types";
import FilterOptions from "./FilterOptions";

type filterProps = {
  list: RepairDataT[];
  setList: (list: RepairDataT[]) => void;
};

export default function FilterRepairsContainer({
  list,
  setList = () => {},
}: filterProps) {
  console.log("list", list);
  console.log("setList", setList);

  //TODO filter funtionality

  return <FilterOptions filterOptions={["one", "two"]} />;
}
