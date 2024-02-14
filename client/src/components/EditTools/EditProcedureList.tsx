import { ProcedureT } from "../../hooks/useGetLatest";
import ProcedureEditCard from "./EditProcedureCard";
import useUpdateProcedures from "../../hooks/useUpdateProcedures";

export default function EditProcedureList({
  list,
}: {
  list: ProcedureT[];
}): React.ReactNode {
  //
  const { currentList, dispatch } = useUpdateProcedures(list);

  const procedures = currentList.map((proc) => {
    return (
      <ProcedureEditCard
        updateFn={dispatch}
        proc={proc}
      />
    );
  });
  // console.log("currentList", currentList);
  return (
    <div>
      <ul>{procedures}</ul>
    </div>
  );
}
