import { useLocation } from "react-router-dom";
import { repairDataT } from "../hooks/useGetLatest";
import { ChangeEvent, useEffect, useState } from "react";
import EditProcedureList from "../components/RepairEdit/EditProcedureList";
// import axios from "axios";
import useRepairApi from "../hooks/useRepairApi";
import AvailableOptions from "../components/AvailableOptions/AvailableOptions";

export default function EditRepairPage() {
  const { state: data }: { state: repairDataT } = useLocation();

  //duplicate state incase user wants to revert to original

  const [updatedData, setUpdatedData] = useState(data);

  //delegate proceduresArr to substate
  const [newProceds, setNewProceds] = useState(updatedData.procedureArr);

  const { updateRepair } = useRepairApi();

  useEffect(() => {
    console.log("updatedData", updatedData);
  }, [updatedData]);

  useEffect(() => {
    updateState({ procedureArr: newProceds }, setUpdatedData);
  }, [newProceds]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("updatedData", updatedData.procedureArr);

    try {
      const res = await updateRepair(updatedData);
      console.log("res update repair", res);
    } catch (error) {
      console.log("error handleUpdate @EditRepairPage ", error);
    }
  };

  const availableGroups = [
    {
      label: `original: ${updatedData.group}`,
      value: updatedData.group,
    },
    { label: "public", value: "public" },
  ];

  const availableBoardTypes = [
    {
      label: `original: ${updatedData.boardType}`,
      value: updatedData.group,
    },
    { label: "public", value: "public" },
  ];

  const availableEngines = [
    {
      label: `original: ${updatedData.engineMake}`,
      value: updatedData.engineMake,
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
              // console.log("e", e.target.value);
              setUpdatedData((state) => {
                return { ...state, title: e.target.value };
              });
            }}
            className="text-2xl w-full"
            id="title"
            name="title"
            type="text"
            defaultValue={updatedData.title ? updatedData.title : ""}
          />
        </div>

        <div>
          <span>Repair Id:</span>
          <div className="badge badge-neutral"> {updatedData._id}</div>
        </div>
        <div>
          <span>created by user:</span>
          <div className="badge badge-neutral"> {updatedData.createdBy}</div>
        </div>

        <div>
          <AvailableOptions
            title="User group"
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
              updateState({ engineMake: engine }, setUpdatedData);

              // updateEngine({
              //   engineSelected: engine,
              //   setState: setUpdatedData,
              // });
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
          updateFn={setNewProceds}
          list={updatedData.procedureArr}
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

function updateState(
  fieldUpdate: object,
  setState: React.Dispatch<React.SetStateAction<repairDataT>>
) {
  setState((state) => {
    return { ...state, ...fieldUpdate };
  });
}
