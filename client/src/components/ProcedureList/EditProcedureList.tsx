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
  //

  // const { currentFormState: procedureList, formDispatch } = useRepairFormState();

  const addNewProcedure = (index: number) => {
    formDispatch({
      type: "ADD_PROCEDURE",
      payload: { procIndex: index },
    });
  };

  const procedures = procedureList.map((proc, index) => {
    const instructions = (text: string) => {
      formDispatch({
        type: "UPDATE_INTRUC",
        payload: { procIndex: index, instructions: text },
      });
    };
    const addImage = () => {
      formDispatch({
        type: "ADD_IMAGE",
        payload: { procIndex: index },
      });
    };

    //! working here
    const editImage = (imageIndex: number, updatedImageObj: ImageObjT) => {
      formDispatch({
        type: "UPDATE_IMAGES",
        payload: {
          procIndex: index,
          newImageIndex: imageIndex,
          newImageObj: updatedImageObj,
        },
      });
    };

    //object with update functions for editProcedureCard component
    const updateProcedure = { instructions, addImage, editImage };

    return (
      <li key={uuidv4()}>
        <EditProcedureCard
          updateProcedure={updateProcedure}
          proc={proc}
          index={index}
        />

        <div
          onClick={() => {
            addNewProcedure(index + 1);
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
