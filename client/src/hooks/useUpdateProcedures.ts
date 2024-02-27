import { useReducer } from "react";
import { ProcedureT, imageObjT } from "./useGetLatest";

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
  UPDATE_IMAGES,
  ADD_IMAGE,
  UPDATE_INTRUC,
  ADD_PROCEDURE,
}

// export type imageObjT = {
//   imageUrl: string;
//   imageThumb: string;
//   caption: string;
//   imageId: string;
//   folder: string;
// };

export type ChangeProcPayloadT = {
  procIndex: number;
  instructions?: string;
  newImageUrl?: string;
  newImageIndex?: number;
  newImageObj?: imageObjT;
};

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
    case DispatchType.UPDATE_IMAGES:
      newState = updateImage(state, action.payload);
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
    if (payload.procIndex == index) {
      return { ...proc, instructions: payload.instructions } as ProcedureT;
    }
    return proc;
  });
  // console.log("newState", newState);

  return newState;
}

function updateImage(state: ProcedureT[], payload: ChangeProcPayloadT) {
  console.log("payload", payload);

  if (!payload.newImageUrl || typeof payload.newImageIndex != "number") {
    console.log("no index to update image@useUpdateProcedures.updateImage");
    return state;
  }

  const procIndex = payload.procIndex;
  const targetProc = state[procIndex];
  const imageIndexToUpdate = payload.newImageIndex;

  const newImageUrl = payload.newImageUrl;
  // const newImageObj = payload?.newImageObj;

  //update legacy image urls property
  targetProc.images[imageIndexToUpdate] = newImageUrl;

  //update state
  const newState = state.map((proc: ProcedureT, index) => {
    if (procIndex == index) {
      return targetProc;
    }
    return proc;
  });
  console.log("new state", newState);

  return state;
}
