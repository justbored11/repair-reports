import { useReducer } from "react";
import { ChangeFormPayloadT, RepairFormStateActionT } from "../../types";
import { Repair } from "../classes/Repair";
import { ImageObj } from "../classes/ImageObj";
import { Procedure } from "../classes/Procedure";
const LOC = "@useRepairFormState ";

export const newRepairForm = new Repair();

export default function useRepairFormState() {
  const [currentFormState, formDispatch] = useReducer(
    updateFormDataReducer,
    new Repair()
  );

  return { currentFormState, formDispatch };
}

function updateFormDataReducer(state: Repair, action: RepairFormStateActionT) {
  let newState = state;
  switch (action.type) {
    case "ADD_IMAGE":
      newState = addEmptyImageToProcedure(state, action.payload);
      break;
    case "UPDATE_FIELD":
      newState = updateField(state, action.payload);
      break;
    case "ADD_PROCEDURE":
      newState = addProcedure(state, action.payload);
      break;
    case "UPDATE_PROCEDURES":
      newState = updateProcedures(state, action.payload);
      break;
    case "UPDATE_IMAGES":
      newState = updateImage(state, action.payload);
      break;
    case "UPDATE_INTRUC":
      newState = updateInstruction(state, action.payload);
      break;
    case "UPDATE_SEARCH_TAGS":
      newState = updateSearchTags(state, action.payload);
      break;
    case "REMOVE_IMAGE":
      newState = removeImage(state, action.payload);
      break;
    case "REMOVE_PROCEDURE":
      newState = removeProcedure(state, action.payload);
      break;

    default:
      console.log("no action available for ", LOC, action);
      return state;
      break;
  }

  return newState;
}

function updateSearchTags(state: Repair, payload: ChangeFormPayloadT) {
  console.log("payload", payload.searchTags);
  const { searchTags } = payload;

  if (!searchTags) return state;

  state.searchTags = searchTags ? searchTags : state.searchTags;

  return { ...state };
}

function addProcedure(state: Repair, payload: ChangeFormPayloadT) {
  const updatedProcedures = [];
  const oldProcedures = state.procedureArr;
  const newProcedure = new Procedure();

  const procIndex =
    typeof payload.procIndex == "number" && payload.procIndex >= 0
      ? payload.procIndex
      : 0;

  //add to begining
  if (procIndex == 0) {
    return {
      ...state,
      procedureArr: [newProcedure, ...oldProcedures],
    };
  }

  //if new index is larger than old array add new instance to end of state
  if (procIndex > oldProcedures.length - 1) {
    return { ...state, procedureArr: [...oldProcedures, newProcedure] };
  }

  for (let i = 0; i < oldProcedures.length; i++) {
    if (i == procIndex) {
      updatedProcedures.push(newProcedure);
      updatedProcedures.push(oldProcedures[i]);
      continue;
    }

    updatedProcedures.push(oldProcedures[i]);
  }

  return { ...state, procedureArr: updatedProcedures };
}

function updateField(state: Repair, payload: ChangeFormPayloadT) {
  return { ...state, ...payload.formField };
}

function updateProcedures(state: Repair, payload: ChangeFormPayloadT) {
  const { allProcedures } = payload;

  return { ...state, procedureArr: allProcedures } as Repair;
}

function updateInstruction(state: Repair, payload: ChangeFormPayloadT): Repair {
  const { procIndex, instructions } = payload;

  const data = state;

  const index = procIndex ? procIndex : 0;

  data.procedureArr[index].instructions = instructions ? instructions : "";

  return data;
}

///UPDATE IMAGE action
function updateImage(state: Repair, payload: ChangeFormPayloadT) {
  const { procIndex, imageIndex: newImageIndex, newImageObj } = payload;

  console.log("newImageObj", newImageObj);
  //does image exists, have an index to update at, and index is valid if not then do nothing
  //if fail do nothing an return state
  if (
    typeof newImageIndex != "number" ||
    newImageIndex < 0 ||
    !newImageObj ||
    !newImageObj?.imageUrl
  ) {
    return state;
  }

  //procedure index not number do nothing
  if (typeof procIndex != "number") {
    return state;
  }

  // const procIndex = payload.procIndex;
  const targetProc = state.procedureArr[procIndex];
  const imageIndexToUpdate = newImageIndex;

  //update legacy image urls :string[] property
  targetProc.images[imageIndexToUpdate] = newImageObj.imageUrl;

  //update image objs :ImageObj[]
  targetProc.imageObjs[imageIndexToUpdate] = newImageObj;

  // return state as Repair;// old working code
  return { ...state }; //working code

  // return { ...state, procedureArr: newProcedures } as RepairFormT;
}

//remove image from both images and imageObj arrays
function removeImage(state: Repair, payload: ChangeFormPayloadT) {
  const { procIndex, imageId } = payload;

  //todo trying to filter based on imageId which is generated in cosntructor and will
  //todo replaced when image is uploaded with unique id
  const targetId = imageId;

  //does image exist, have an index to remove at, and index is valid if not then do nothing
  if (!imageId) {
    console.log("payload", payload);
    console.log(
      "no index to update or url to update with image @useUpdateProcedures.removeImage"
    );
    return state;
  }

  if (typeof procIndex != "number") {
    return state;
  }

  console.log("looking for ", imageId);

  //todo //remove image from old images array
  const targetProc = state.procedureArr[procIndex];
  const newImagesArr = targetProc.images.filter((url) => {
    if (url.includes(imageId)) return false;

    return true;
  });

  //get images if any from procedure
  // const images = state.procedureArr[procIndex]?.images;
  const imageObjs = targetProc?.imageObjs;
  const newImageObjs = imageObjs.filter((item) => {
    if (item.imageId == targetId) return false;

    return true;
  });
  // const procIndex = payload.procIndex;

  targetProc.imageObjs = newImageObjs;
  targetProc.images = newImagesArr;

  return { ...state } as Repair;
}

function addEmptyImageToProcedure(state: Repair, payload: ChangeFormPayloadT) {
  const { procIndex } = payload;

  const newProcedures = state.procedureArr.map((proc, index) => {
    if (index == procIndex) {
      //case images must be updated on image array and imageObj array
      //imageObjs[] will be initialized if one undefined
      return {
        ...proc,
        // images: [...proc.images, ""],
        imageObjs: [...proc.imageObjs, new ImageObj()],
      };
    } else {
      return proc;
    }
  });
  return { ...state, procedureArr: newProcedures } as Repair;
}

function removeProcedure(state: Repair, payload: ChangeFormPayloadT) {
  const targetId = payload.procedureId;
  const updatedProcedureArr = state.procedureArr.filter((procedure) => {
    if (procedure.id == targetId) {
      return false;
    }
    return true;
  });
  state.procedureArr = updatedProcedureArr;

  console.log("updatedProcedureArr", updatedProcedureArr);
  // return updatedProcedureArr;
  return { ...state };
}
