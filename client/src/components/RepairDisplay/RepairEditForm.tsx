import React, { ChangeEvent, useState } from "react";
import useRepairFormState from "../../hooks/useRepairFormState";
import AvailableOptions, {
  OptionT,
} from "../AvailableOptions/AvailableOptions";
import AvailableOptionsMulti from "../AvailableOptions/AvailableOptionsMulti";
import { Repair } from "../../classes/Repair";
import EditProcedureList from "../ProcedureList/EditProcedureList";

export default function RepairEditForm({
  repair,
  onSubmit,
  enabled = true,
  submitType,
}: {
  repair?: Repair | null | undefined;
  onSubmit?: (repair: Repair) => Promise<void>;
  enabled?: boolean;
  submitType: string;
}) {
  // const navigate = useNavigate();
  const { currentFormState, formDispatch } = useRepairFormState(repair);
  // const { postRepair } = useRepairApi();

  const [submitAllowed, setSubmitAllowed] = useState(enabled);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log("currentFormState", currentFormState);
    try {
      if (onSubmit) {
        onSubmit(currentFormState);
      }
    } catch (error) {
      setSubmitAllowed(true);
      console.log("error handleUpdate @RepairPage ", error);
    }
  };

  const availableGroups: OptionT[] = [
    {
      label: `original: ${currentFormState.group}`,
      value: currentFormState.group,
    },
    { label: "public", value: "public" },
  ];

  const availableBoardTypes: OptionT[] = [
    {
      label: `original: ${currentFormState.boardType}`,
      value: currentFormState.group,
    },
    { label: "Cat70 IK", value: "IK" },
    { label: "Cat40 CA", value: "CA" },
    { label: "DDEC 2", value: "DDEC2" },
    { label: "DDEC 3", value: "DDEC3" },
    { label: "DDEC 4", value: "DDEC4" },
  ];

  const availableEngines: OptionT[] = [
    {
      label: `original: ${currentFormState.engineMake}`,
      value: currentFormState.engineMake,
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
      <legend className=" gap-4 flex flex-col rounded-lg p-2 border-gray-600 w-full">
        <div className="flex flex-col w-full justify-around items-center align-middle ">
          <div className="flex-1 flex justify-end">
            <span className="text-4xl w-full text-right">Title:</span>
          </div>
          <div className="flex-1 flex justify-start">
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // console.log("e", e.target.value);

                formDispatch({
                  type: "UPDATE_FIELD",
                  payload: { formField: { title: e.target.value } },
                });
              }}
              className="text-2xl w-full bg-white"
              id="title"
              name="title"
              type="text"
              defaultValue={currentFormState.title}
            />
          </div>
        </div>

        <div className="">
          <AvailableOptions
            title="Visibility group"
            options={availableGroups}
            callback={(group: string) => {
              formDispatch({
                type: "UPDATE_FIELD",
                payload: { formField: { group } },
              });
            }}
          />
        </div>
        <div>
          <AvailableOptions
            title="Board Type"
            options={availableBoardTypes}
            callback={(boardType: string) => {
              formDispatch({
                type: "UPDATE_FIELD",
                payload: { formField: { boardType } },
              });
            }}
          />
        </div>
        <div>
          <AvailableOptions
            callback={(engineMake: string) => {
              formDispatch({
                type: "UPDATE_FIELD",
                payload: { formField: { engineMake } },
              });
            }}
            title="Engine make"
            options={availableEngines}
          />
        </div>
        <div>
          <AvailableOptionsMulti
            callback={(searchTags: string[]) => {
              formDispatch({
                type: "UPDATE_SEARCH_TAGS",
                payload: { searchTags },
              });
            }}
            // defaultValue={currentFormState.searchTags}
            // defaultValue={}
            title="Search tags"
            options={availableTags}
          />
        </div>
      </legend>

      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <EditProcedureList
          formDispatch={formDispatch}
          procedureList={currentFormState.procedureArr}
        />
      </section>
      {/* submit section */}
      <section className={`p-3`}>
        <button
          type="submit"
          className="btn"
          disabled={!submitAllowed}>
          {submitType ? submitType : "Create Repair"}
        </button>
      </section>
    </form>
  );
}
