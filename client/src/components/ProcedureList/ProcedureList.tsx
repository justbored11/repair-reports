import { ProcedureT } from "../../../types";
// import { Procedure } from "../../classes/Procedure";
import { ProcedureCard } from "./ProcedureCard";

export default function ProcedureList({
  list,
}: {
  list: ProcedureT[];
}): React.ReactNode {
  const cards = list.map((proc) => {
    return <ProcedureCard proc={proc} />;
  });
  return (
    <div>
      <ul>{cards}</ul>
    </div>
  );
}
