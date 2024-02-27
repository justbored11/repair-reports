import { useReducer } from "react";
import { ProcedureT, imageObjT } from "./useGetLatest";

const LOC = "@useRepairFormState ";

const proc: ProcedureT = {
  images: [],
  imageObjs: [],
  imagesIdArr: [],
  instructions: "",
  procedureNum: 0,
  thumbs: [],
};

const newRepairState = {
  boardType: "other",
  engineMake: "other",
  group: "public",
  procedureArr: [proc],
  title: "New Repair",
};

export type RepairFormT = typeof newRepairState;

export default function useRepairFormState() {
  const [currentFormState, formDispatch] = useReducer(
    updateFormData,
    newRepairState
  );

  return { state: currentFormState, dispatch: formDispatch };
}

export type updateProcDispT = React.Dispatch<{
  type: DispatchType;
  payload: ChangeFormPayloadT;
}>;

export enum DispatchType {
  UPDATE_IMAGES,
  ADD_IMAGE,
  UPDATE_INTRUC,
  ADD_PROCEDURE,
  REMOVE_PROCEDURE,
  UPDATE_PROCEDURES,
  UPDATE_FIELD,
}

// export type imageObjT = {
//   imageUrl: string;
//   imageThumb: string;
//   caption: string;
//   imageId: string;
//   folder: string;
// };

export type ChangeFormPayloadT = {
  procIndex?: number;
  instructions?: string;
  newImageUrl?: string;
  newImageIndex?: number;
  newImageObj?: imageObjT;
  allProcedures?: ProcedureT[];
  formField?: Record<string, string>;
};

function updateFormData(
  state: RepairFormT,
  action: { type: DispatchType; payload: ChangeFormPayloadT }
) {
  let newState = state;
  switch (action.type) {
    case DispatchType.ADD_IMAGE:
      break;
    case DispatchType.UPDATE_FIELD:
      newState = updateField(state, action.payload);
      break;
    case DispatchType.ADD_PROCEDURE:
      break;
    case DispatchType.UPDATE_PROCEDURES:
      newState = updateProcedures(state, action.payload);
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

function updateField(state: RepairFormT, payload: ChangeFormPayloadT) {
  return { ...state, ...payload.formField };
}

function updateProcedures(state: RepairFormT, payload: ChangeFormPayloadT) {
  const { allProcedures } = payload;

  return { ...state, ProcedureArr: allProcedures } as RepairFormT;
}

function updateInstruction(
  state: RepairFormT,
  payload: ChangeFormPayloadT
): RepairFormT {
  // console.log("state", state);
  // console.log("payload", payload);
  const newProcedures = state.procedureArr.map((proc: ProcedureT, index) => {
    if (payload.procIndex == index) {
      return { ...proc, instructions: payload.instructions } as ProcedureT;
    }
    return proc;
  });
  // console.log("newState", newState);

  return { ...state, procedureArr: newProcedures };
}

///UPDATE IMAGE action
function updateImage(state: RepairFormT, payload: ChangeFormPayloadT) {
  console.log(`${LOC} form payload`, payload);

  //have new image to update
  if (
    !payload.newImageUrl ||
    typeof payload.newImageIndex != "number" ||
    !(payload?.procIndex && payload.procIndex > 0)
  ) {
    console.log("no index to update image@useUpdateProcedures.updateImage");
    return state;
  }

  const images = state.procedureArr[payload.procIndex]?.images;

  //image might be in array remove from database and insert new
  if (Array.isArray(images) && images.length > payload.newImageIndex) {
    //todo remove image
  }

  const procIndex = payload.procIndex;
  const targetProc = state.procedureArr[procIndex];
  const imageIndexToUpdate = payload.newImageIndex;

  const newImageUrl = payload.newImageUrl;
  // const newImageObj = payload?.newImageObj;

  //update legacy image urls property
  targetProc.images[imageIndexToUpdate] = newImageUrl;

  //update state
  //update the image in specified index of procedureArr
  const newProcedures = state.procedureArr.map((proc: ProcedureT, index) => {
    if (procIndex == index) {
      return targetProc;
    }
    return proc;
  });

  return { ...state, procedureArr: newProcedures } as RepairFormT;
}
