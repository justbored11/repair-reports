import { useReducer } from "react";
import { ProcedureT } from "./useGetLatest";

export default function useUpdateProcedures(procedureList: ProcedureT[]) {
  const [currentList, dispatch] = useReducer(changeProcedures, procedureList);

  return { currentList, dispatch };
}

export enum DispatchType {
  UPDATE_IMAGE,
  ADD_IMAGE,
  UPDATE_INTRUC,
  ADD_PROCEDURE,
}
function changeProcedures(
  state: ProcedureT[],
  action: { type: DispatchType; payload: object }
) {
  console.log("state", state);
  console.log("action", action);

  return state;
}
