import EditProcedureCard from "./EditProcedureCard";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageObjT, ProcedureT, RepairFormDispatchT } from "../../../types";

export default function EditProcedureList({
  procedureList,
  formDispatch,
}: {
  procedureList: ProcedureT[];
  formDispatch: RepairFormDispatchT;
}): React.ReactNode {
  const addNewProcedure = (index: number) => {
    formDispatch({
      type: "ADD_PROCEDURE",
      payload: { procIndex: index },
    });
  };

  const procedures = procedureList.map((procedureData, procedureIndex) => {
    //object with update functions for editProcedureCard component
    const updateProcedureMethods = generateProcedureMethods({
      formDispatch,
      procedureIndex,
    });

    return (
      <li key={uuidv4()}>
        <EditProcedureCard
          updateProcedureMethods={updateProcedureMethods}
          proc={procedureData}
          index={procedureIndex}
        />

        <div
          onClick={() => {
            addNewProcedure(procedureIndex + 1);
          }}
          className="btn">
          Add new Procedure here
        </div>
      </li>
    );
  });

  return (
    <div>
      <div
        onClick={() => {
          addNewProcedure(0);
        }}
        className="btn">
        Add new Procedure at begining
      </div>
      <ul className="w-full">{procedures}</ul>
    </div>
  );
}

//create methods for specific procedure based on there index position
function generateProcedureMethods({
  procedureIndex,
  formDispatch,
}: {
  procedureIndex: number;
  formDispatch: RepairFormDispatchT;
}) {
  const instructions = (text: string) => {
    formDispatch({
      type: "UPDATE_INTRUC",
      payload: { procIndex: procedureIndex, instructions: text },
    });
  };

  const addImage = () => {
    formDispatch({
      type: "ADD_IMAGE",
      payload: { procIndex: procedureIndex },
    });
  };

  const editImage = (imageIndex: number, updatedImageObj: ImageObjT) => {
    formDispatch({
      type: "UPDATE_IMAGES",
      payload: {
        procIndex: procedureIndex,
        imageIndex: imageIndex,
        newImageObj: updatedImageObj,
      },
    });
  };

  const removeImage = (imageId: string) => {
    formDispatch({
      type: "REMOVE_IMAGE",
      payload: { imageId, procIndex: procedureIndex },
    });
  };
  return {
    instructions,
    addImage,
    editImage,
    removeImage,
  };
}
