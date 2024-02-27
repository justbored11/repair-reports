import { ProcedureT } from "../../hooks/useGetLatest";
import EditProcedureForm from "./EditProcedureForm";
import useUpdateProcedures from "../../hooks/useUpdateProcedures";
import React, { useEffect } from "react";

export default function EditProcedureList({
  list,
  updateFn,
}: {
  list: ProcedureT[];
  updateFn: (newProcedures: ProcedureT[]) => void;
}): React.ReactNode {
  //
  //state holding all procedures on an array central state
  const { currentListState, dispatch } = useUpdateProcedures(list);

  useEffect(() => {
    // console.log("currentListState", currentListState);
    updateFn(currentListState);
  }, [currentListState]);

  const procedures = currentListState.map((proc, index) => {
    return (
      <EditProcedureForm
        reducer={dispatch}
        proc={proc}
        index={index}
      />
    );
  });

  return (
    <div>
      <ul>{procedures}</ul>
    </div>
  );
}
