import { useLocation } from "react-router-dom";
import { repairDataT } from "../hooks/useGetLatest";
import { ChangeEvent, useEffect, useState } from "react";
import EditProcedureList from "../components/RepairEdit/EditProcedureList";
import { AvailableEnginesSelect } from "../components/AvailableOptions/AvailableEngines";
// import axios from "axios";
import useRepairApi from "../hooks/useRepairApi";

export default function EditRepairPage() {
  const { state: data }: { state: repairDataT } = useLocation();

  //duplicate state incase user wants to revert to original

  const [updatedData, setUpdatedData] = useState(data);

  //delegate proceduresArr to substate
  const [newProceds, setNewProceds] = useState(updatedData.procedureArr);

  const { updateRepair } = useRepairApi();

  useEffect(() => {
    // console.log("new data", updatedData);
    // console.log("central procedures state @EditRepairPage", newProceds);

    //bring in substate for procedureArr back into the main state
    setUpdatedData((state) => {
      return { ...state, procedureArr: newProceds };
    });
  }, [newProceds]);

  // useEffect(() => {
  //   console.log("updatedData : ", updatedData);
  // }, [updatedData]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("updatedData", updatedData);

    try {
      const res = await updateRepair(updatedData);
      console.log("res update repair", res);
    } catch (error) {
      console.log("error handleUpdate @EditRepairPage ", error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <legend className=" border-4 rounded-lg p-2 border-gray-600">
        <span className=" text-4xl">Title:</span>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log("e", e.target.value);
            setUpdatedData((state) => {
              return { ...state, title: e.target.value };
            });
          }}
          className="text-4xl"
          id="title"
          name="title"
          type="text"
          defaultValue={updatedData.title ? updatedData.title : ""}
        />
        <h3>repair info</h3>
        <div>
          <span>Repair Id:</span>
          <div className="badge badge-neutral"> {updatedData._id}</div>
        </div>
        <div>
          <span>created by user:</span>
          <div className="badge badge-neutral"> {updatedData.createdBy}</div>
        </div>
        <AvailableEnginesSelect defaultValue={updatedData.engineMake} />
        <div>
          <span>user group:</span>
          <div className="badge badge-neutral"> {updatedData.group}</div>
        </div>
        <div>
          <span>board type:</span>
          <div className="badge badge-neutral"> {updatedData.boardType}</div>
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
