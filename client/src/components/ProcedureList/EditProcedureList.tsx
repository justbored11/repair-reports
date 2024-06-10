import EditProcedureCard from "./EditProcedureCard";

import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProcedureT } from "../../../types";
// import { Procedure } from "../../classes/Procedure";
// import { ImageObj } from "../../classes/ImageObj";
import { Procedure } from "../../classes/Procedure";
import {
  RepairFormDataContext,
  formActionT,
} from "../../context/RepairFormContext";

import { addItem } from "../../hooks/utils/addItem";

type ProcedureListItemT = {
  _id: string;
  component: React.ReactNode;
};

export default function EditProcedureList({
  procedureList,
}: {
  procedureList: ProcedureT[];
}): React.ReactNode {
  //
  //starting out procedures state
  const [ProcedureList, setProcedureList] = useState<
    {
      _id: string;
      component: React.ReactNode;
    }[]
  >([]);

  const { formAction } = useContext(RepairFormDataContext);

  useEffect(() => {
    setProcedureList(() => {
      return initializeProcedures({
        procs: procedureList,
        setter: setProcedureList,
        formAction,
      });
    });
  }, []);

  return (
    <div>
      <div
        onClick={() => {
          const procedure = new Procedure();
          //sync id
          const _id = procedure._id;

          //sync components in state
          addAtBegining({
            setter: setProcedureList,
            itemToAdd: {
              _id,
              component: createProcedureCard({
                procedure,
                id: _id,
                setter: setProcedureList,
                formAction,
              }),
            },
          });

          ///sync componente to form context
          formAction.addProcedureAtBegining(procedure);
        }}
        className="btn">
        Add new Procedure at begining
      </div>
      <ul className="w-full flex flex-col gap-2 overflow-hidden">
        {ProcedureList.map((proc) => proc.component)}
      </ul>
    </div>
  );
}

/// initialize display components and form state to match
function initializeProcedures({
  procs,
  setter,
  formAction,
}: {
  procs: ProcedureT[];
  formAction?: formActionT;
  setter: React.Dispatch<
    React.SetStateAction<
      {
        _id: string;
        component: React.ReactNode;
      }[]
    >
  >;
}): {
  _id: string;
  component: React.ReactNode;
}[] {
  const procedureComponents = procs.map((procedureData) => {
    const _id = procedureData?._id ? procedureData?._id : uuidv4();
    return {
      _id,
      component: createProcedureCard({
        formAction,
        id: _id,
        setter,
        procedure: procedureData,
      }),
    };
  });

  return procedureComponents;
}

///
function addAtBegining({
  setter,
  itemToAdd,
}: {
  setter: React.Dispatch<React.SetStateAction<ProcedureListItemT[]>>;
  itemToAdd: ProcedureListItemT;
}) {
  setter((state) => {
    const newState = addItem({
      pos: "begining",
      arr: state,
      item: itemToAdd,
    });

    return newState;
  });
}

///setter to update state , item to add to state, id to target component in array
function addProcedureAfter({
  setter,
  itemToAdd,
  id,
}: {
  setter: React.Dispatch<React.SetStateAction<ProcedureListItemT[]>>;
  itemToAdd: ProcedureListItemT;
  id: string;
}) {
  setter((state) => {
    const newState = addItem({
      pos: "after",
      arr: state,
      item: itemToAdd,
      id,
    });

    return newState;
  });
}

function createProcedureCard({
  id,
  setter,
  procedure,
  formAction,
}: {
  id: string;
  procedure: ProcedureT;
  formAction?: formActionT;
  setter: React.Dispatch<
    React.SetStateAction<
      {
        _id: string;
        component: React.ReactNode;
      }[]
    >
  >;
}) {
  return (
    <li
      key={id}
      className="">
      <EditProcedureCard
        key={id}
        procedureData={procedure}
        id={id ? id : uuidv4()}
      />
      <div
        onClick={() => {
          const newProc = new Procedure();

          addProcedureAfter({
            id,
            setter,
            itemToAdd: {
              _id: newProc._id,
              component: createProcedureCard({
                procedure: newProc,
                id: newProc._id,
                setter,
                formAction,
              }),
            },
          });

          if (formAction) formAction.addProcedureAfter(id, newProc);
        }}
        className="btn">
        Add new Procedure here
      </div>
    </li>
  );
}
