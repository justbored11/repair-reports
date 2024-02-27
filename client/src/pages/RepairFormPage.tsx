import React, { ChangeEvent, useEffect } from "react";
import AvailableOptions from "../components/AvailableOptions/AvailableOptions";
import EditProcedureList from "../components/RepairEdit/EditProcedureList";
// import { repairDataT } from "../hooks/useGetLatest";
// import useRepairApi from "../hooks/useRepairApi";
import useRepairFormState, { DispatchType } from "../hooks/useRepairFormState";

const startingProcedure = {
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
  procedureArr: [startingProcedure],
  title: "New Repair",
};

export type NewRepairT = typeof newRepairState;

export default function RepairFormPage(): React.ReactNode {
  // const { state: data }: { state: repairDataT } = useLocation();

  //duplicate state incase user wants to revert to original

  // const [updatedData, setUpdatedData] = useState<NewRepairT>(newRepairState);
  const { state: currentFormState, dispatch: formDispatch } =
    useRepairFormState();

  //delegate proceduresArr to substate
  // const [newProceds, setNewProceds] = useState(updatedData.procedureArr);

  // const { createRepair } = useRepairApi();

  useEffect(() => {
    console.log("currentFormState useEffect ln41", currentFormState);
  }, [currentFormState]);

  // useEffect(() => {
  //   updateState({ procedureArr: newProceds }, setUpdatedData);
  // }, [newProceds]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("currentFormState submit", currentFormState);

    try {
      // const res = await updateRepair(updatedData);
      // console.log("res update repair", res);
    } catch (error) {
      console.log("error handleUpdate @EditRepairPage ", error);
    }
  };

  const availableGroups = [
    {
      label: `original: ${currentFormState.group}`,
      value: currentFormState.group,
    },
    { label: "public", value: "public" },
  ];

  const availableBoardTypes = [
    {
      label: `original: ${currentFormState.boardType}`,
      value: currentFormState.group,
    },
    { label: "public", value: "public" },
  ];

  const availableEngines = [
    {
      label: `original: ${currentFormState.engineMake}`,
      value: currentFormState.engineMake,
    },
    { label: "Caterpillar", value: "cat" },
    { label: "Cummins", value: "cummins" },
    { label: "Detroit", value: "detroit" },
  ];

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}>
      <legend className=" gap-4 flex flex-col border-4 rounded-lg p-2 border-gray-600">
        <span className=" text-4xl">Title:</span>
        <div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log("e", e.target.value);
              // setUpdatedData((state) => {
              //   return { ...state, title: e.target.value };
              // });
            }}
            className="text-2xl w-full"
            id="title"
            name="title"
            type="text"
            defaultValue={currentFormState.title}
          />
        </div>

        <div>
          <AvailableOptions
            title="Visibility group"
            name="group"
            options={availableGroups}
          />
        </div>
        <div>
          <AvailableOptions
            title="Board Type"
            name="boardType"
            options={availableBoardTypes}
          />
        </div>
        <div>
          <AvailableOptions
            callback={(engine: string) => {
              formDispatch({
                type: DispatchType.UPDATE_FIELD,
                payload: { formField: { engineMake: engine } },
              });
            }}
            title="Engine make"
            name="engine"
            options={availableEngines}
          />
        </div>
      </legend>
      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <EditProcedureList
          updateFn={(newProcList) => {
            formDispatch({
              type: DispatchType.UPDATE_PROCEDURES,
              payload: { allProcedures: newProcList },
            });
          }}
          list={currentFormState.procedureArr}
        />
      </section>
      <button
        type="submit"
        className="btn">
        Update
      </button>
    </form>
  );
}
