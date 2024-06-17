import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import AvailableOptions, {
  OptionT,
} from "../AvailableOptions/AvailableOptions";
import AvailableOptionsMulti from "../AvailableOptions/AvailableOptionsMulti";
import { Repair } from "../../classes/Repair";
import EditProcedureList from "../ProcedureList/EditProcedureList";
import ModalConfirm from "../Modals/ModalConfirm";
import { RepairDataT } from "../../../types";
import { RepairFormDataContext } from "../../context/RepairFormContext";
import { isValidForm } from "../../utils/isValidForm";

export default function RepairEditForm({
  repair,
  onSubmit,
  enabled = true,
  submitType,
}: {
  repair?: RepairDataT | undefined;
  onSubmit?: (repair: Repair) => Promise<void>;
  enabled?: boolean;
  submitType: string;
}) {
  const { repairFormData, initializeRepairFormData, formAction } = useContext(
    RepairFormDataContext
  );

  //have individual state
  const [title, setTitle] = useState(repair ? repair.title : "new title here");
  const [engineMake, setEngineMake] = useState(
    repair ? repair.engineMake : "engine Make"
  );

  const [submitAllowed, setSubmitAllowed] = useState(enabled);
  const [formError, setFormError] = useState<string[] | null>(null);

  useEffect(() => {
    if (repair) {
      //sync form data only
      initializeRepairFormData(repair);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError(null); //reset error on submit

    //validate formdata
    const formStatus = isValidForm(repairFormData);

    //if invalid set error for display
    if (!formStatus.isValid) {
      setFormError(formStatus.reason);
    }

    //pressed submit now disable to allow processing
    setSubmitAllowed(false);

    console.log("formStatus", formStatus);

    //reenable submit after 3 seconds
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setSubmitAllowed(true);
        resolve();
      }, 3000);
    });

    try {
      console.log("repairFormData", repairFormData);
      if (onSubmit && formStatus.isValid) {
        //! todo enable submit
        onSubmit(repairFormData);
      }
    } catch (error) {
      setSubmitAllowed(true);
      console.log("error handleUpdate @RepairPage ", error);
    }
  };

  const availableGroups: OptionT[] = [
    {
      label: `original: ${repair?.group}`,
      value: repair ? repair?.group : "group",
    },
    { label: "public", value: "public" },
  ];

  const availableBoardTypes: OptionT[] = [
    {
      label: `original: ${repair?.boardType}`,
      value: repair?.boardType ? repair.boardType : "boardType",
    },
    { label: "Cat70 IK", value: "IK" },
    { label: "Cat40 CA", value: "CA" },
    { label: "DDEC 2", value: "DDEC2" },
    { label: "DDEC 3", value: "DDEC3" },
    { label: "DDEC 4", value: "DDEC4" },
  ];

  const availableEngines: OptionT[] = [
    {
      label: `original: ${engineMake}`,
      value: engineMake,
    },
    { label: "Caterpillar", value: "cat" },
    { label: "Cummins", value: "cummins" },
    { label: "Detroit", value: "detroit" },
  ];

  //first option is always the default
  const availableTags: OptionT[] = [
    {
      label: "repair",
      value: "repair",
    },
    {
      label: "parts",
      value: "parts",
    },
    {
      label: "diagram",
      value: "diagram",
    },
    {
      label: "Pin out",
      value: "pinout",
    },
  ];

  return (
    <form
      className="w-full bg-slate-300"
      onSubmit={handleSubmit}>
      <div className="flex text-black justify-center">
        {!formError && <div className=" bg-green-500 ">form ok</div>}
        {formError && <div className="bg-red-600">Invalid form</div>}
        <div>{formError}</div>
      </div>
      <legend className=" gap-4 flex flex-col rounded-lg p-2 border-gray-600 w-full">
        <div className="flex flex-col w-full justify-around items-center align-middle ">
          <div className="flex-1 flex justify-end">
            <span className="text-4xl w-full text-right">Title:</span>
          </div>
          <div className="flex-1 flex justify-start">
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const title = e.target.value;
                formAction.updateTitle(title);
                setTitle(e.target.value);
              }}
              className="text-2xl w-full bg-white"
              id="title"
              name="title"
              type="text"
              defaultValue={title}
            />
          </div>
        </div>

        <div className="">
          <AvailableOptions
            title="Visibility group"
            options={availableGroups}
            callback={(group: string) => {
              console.log("changed group", group);
            }}
          />
        </div>
        <div>
          <AvailableOptions
            title="Board Type"
            options={availableBoardTypes}
            callback={(boardType: string) => {
              formAction.updateBoardType(boardType);
            }}
          />
        </div>
        <div>
          <AvailableOptions
            callback={(engineMake: string) => {
              formAction.updateEngineMake(engineMake);
              setEngineMake(engineMake);
            }}
            title="Engine make"
            options={availableEngines}
          />
        </div>
        <div>
          <AvailableOptionsMulti
            callback={(searchTags: string[]) => {
              console.log("no searchtag form action or state", searchTags);
            }}
            title="Search tags"
            options={availableTags}
          />
        </div>
      </legend>

      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <EditProcedureList
          procedureList={repair?.procedureArr ? repair.procedureArr : []}
        />
      </section>
      {/* submit section */}
      <section className={`p-3`}>
        <ModalConfirm label={submitType ? submitType : "Create Repair"}>
          <div>
            <span>Please confirm: </span>
            <button
              type="submit"
              className="btn"
              disabled={!submitAllowed}>
              {submitType ? submitType : "Create Repair"}
            </button>
          </div>
        </ModalConfirm>
      </section>
    </form>
  );
}
