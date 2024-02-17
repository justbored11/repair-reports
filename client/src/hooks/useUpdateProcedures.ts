import { useReducer } from "react";
import { ProcedureT } from "./useGetLatest";

export default function useUpdateProcedures(procedureList: ProcedureT[]) {
  const [currentListState, dispatch] = useReducer(
    changeProcedures,
    procedureList
  );

  return { currentListState, dispatch };
}

export type updateProcDispT = React.Dispatch<{
  type: DispatchType;
  payload: ChangeProcPayloadT;
}>;

export enum DispatchType {
  UPDATE_IMAGE,
  ADD_IMAGE,
  UPDATE_INTRUC,
  ADD_PROCEDURE,
}

export type ChangeProcPayloadT = { index: number; instructions?: string };

function changeProcedures(
  state: ProcedureT[],
  action: { type: DispatchType; payload: ChangeProcPayloadT }
) {
  let newState = state;
  switch (action.type) {
    case DispatchType.ADD_IMAGE:
      break;
    case DispatchType.ADD_PROCEDURE:
      break;
    case DispatchType.UPDATE_IMAGE:
      break;
    case DispatchType.UPDATE_INTRUC:
      newState = updateInstruction(state, action.payload);
      break;

    default:
      break;
  }

  return newState;
}

function updateInstruction(
  state: ProcedureT[],
  payload: ChangeProcPayloadT
): ProcedureT[] {
  // console.log("state", state);
  // console.log("payload", payload);
  const newState = state.map((proc: ProcedureT, index) => {
    if (payload.index == index) {
      return { ...proc, instructions: payload.instructions } as ProcedureT;
    }
    return proc;
  });
  // console.log("newState", newState);

  return newState;
}
