import { useReducer } from "react";
import { ProcedureT, imageObjT } from "./useGetLatest";

export default function useProcedureListState(procedureList: ProcedureT[]) {
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
  CHANG_IMAGE_LIST,
  UPDATE_INTRUC,
  ADD_NEW_PROCEDURE,
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
  newImageOrder?: string[];
};

function changeProcedures(
  state: ProcedureT[],
  action: { type: DispatchType; payload: ChangeProcPayloadT }
) {
  let newState = state;
  switch (action.type) {
    case DispatchType.CHANG_IMAGE_LIST:
      newState = changeImageList(state, action.payload);
      // newState = state;
      break;
    case DispatchType.ADD_NEW_PROCEDURE:
      newState = addProcedureAtIndex(state, action.payload);
      break;
    case DispatchType.UPDATE_IMAGE:
      newState = updateImage(state, action.payload);
      break;
    case DispatchType.UPDATE_INTRUC:
      console.log("instruc update");
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
  const newState = state.map((proc: ProcedureT, index) => {
    if (payload.procIndex == index) {
      return { ...proc, instructions: payload.instructions } as ProcedureT;
    }
    return proc;
  });
  // console.log("newState", newState);

  return newState;
}

//
function updateImage(state: ProcedureT[], payload: ChangeProcPayloadT) {
  // console.log("payload", payload);

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

  //update state with image url
  const newState = state.map((proc: ProcedureT, index) => {
    if (procIndex == index) {
      return targetProc;
    }
    return proc;
  });
  console.log("new state", newState);

  return newState;
}

//
function changeImageList(state: ProcedureT[], payload: ChangeProcPayloadT) {
  console.log("changeImageList");
  const { newImageOrder, procIndex } = payload;

  if (!newImageOrder) {
    console.log("newImageOrder property is undefined require string[]");
  }

  //update legacy image urls property
  // targetProc.images = [...targetProc.images, "#empty"];

  //update state with image url
  const newState = state.map((proc, index) => {
    if (index == procIndex) {
      return { ...proc, images: newImageOrder };
    }
    return proc;
  });

  return newState as ProcedureT[];
}

//! not adding new procedure
function addProcedureAtIndex(state: ProcedureT[], payload: ChangeProcPayloadT) {
  const procIndex = payload.procIndex < 0 ? 0 : payload.procIndex;
  const newProc = new Procedure({ procedureNum: procIndex });

  let newState = [...state];
  if (procIndex > state.length - 1) {
    newState = [...newState, newProc];
    return newState;
  }

  // for (let i = 0; i < state.length; i++) {
  //   if (i == procIndex) {
  //     newState.push(newProc);
  //     newState.push(state[i]);
  //     continue;
  //   }

  //   newState.push(state[i]);
  // }

  console.log("newState", newState);
  return newState;
}

class Procedure implements ProcedureT {
  public images = ["#"];
  public imageObjs: imageObjT[] = [new ProcedureImageObj("#")];
  public imagesIdArr = [];
  public instructions = "";
  public procedureNum = 0;
  public thumbs = ["#"];
  constructor({ procedureNum }: { procedureNum?: number }) {
    this.procedureNum =
      typeof procedureNum == "number" && procedureNum >= 0 ? procedureNum : 0;
  }
}

class ProcedureImageObj implements imageObjT {
  public imageUrl = "#";
  public imageThumb = "#";
  public caption = "";
  public imageId = "#";
  public folder = "test";
  constructor(url: string) {
    this.imageUrl = url;
  }
}
