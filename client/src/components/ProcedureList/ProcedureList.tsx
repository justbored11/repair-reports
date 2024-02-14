import { ProcedureT } from "../../hooks/useGetLatest";
import { ProcedureCard } from "./ProcedureCard";

export default function ProcedureList({
  list,
}: {
  list: ProcedureT[];
}): React.ReactNode {
  const cards = list.map((proc) => {
    return ProcedureCard(proc);
  });
  return (
    <div>
      <ul>{cards}</ul>
    </div>
  );
}
