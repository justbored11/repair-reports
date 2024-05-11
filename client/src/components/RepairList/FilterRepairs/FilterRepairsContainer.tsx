import { Repair } from "../../../classes/Repair";
import FilterOptions from "./FilterOptions";

type filterProps = {
  list: Repair[];
  setList: (list: Repair[]) => void;
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
