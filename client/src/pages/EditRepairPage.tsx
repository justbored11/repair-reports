import { useLocation } from "react-router-dom";
import { repairDataT } from "../hooks/useGetLatest";
import ProcedureList from "../components/ProcedureList/ProcedureList";
import { useEffect, useState } from "react";

export default function EditRepairPage() {
  const { state: data }: { state: repairDataT } = useLocation();
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    console.log("new data", newData);
  }, [newData]);

  return (
    <section>
      <legend className=" border-4 rounded-lg p-2 border-gray-600">
        <h1 className=" text-4xl">{newData.title ? newData.title : ""}</h1>
        <h3>repair info</h3>
        <div>
          <span>Repair Id:</span>
          <div className="badge badge-neutral"> {newData._id}</div>
        </div>
        <div>
          <span>created by user:</span>
          <div className="badge badge-neutral"> {newData.createdBy}</div>
        </div>
        <div>
          <span>engine make:</span>
          <div className="badge badge-neutral"> {newData.engineMake}</div>
        </div>
        <div>
          <span>user group:</span>
          <div className="badge badge-neutral"> {newData.group}</div>
        </div>
        <div>
          <span>board type:</span>
          <div className="badge badge-neutral"> {newData.boardType}</div>
        </div>
      </legend>
      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <ProcedureList list={newData.procedureArr} />
      </section>
      {/* if user id matches created by field user can use edit tools */}
    </section>
  );
}
