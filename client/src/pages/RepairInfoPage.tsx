// import { repairDataT } from "../hooks/useGetLatest";
import React from "react";

import { useLocation } from "react-router-dom";
import { repairDataT } from "../hooks/useGetLatest";
import ProcedureList from "../components/ProcedureList/ProcedureList";
import EditTools from "../components/RepairEdit/EditTools";
import Comments from "../components/Comments/Comments";
import useAuthContext from "../hooks/useAuthContext";

export const RepairInfoPage = (): React.ReactNode => {
  // const { repair_id } = useParams();
  const { state: data }: { state: repairDataT } = useLocation();
  console.log("data at repair info page", data);
  const { userInfo } = useAuthContext();
  const userId = userInfo?._id;

  return (
    <section>
      <legend className=" border-4 rounded-lg p-2 border-gray-600">
        <h1 className=" text-4xl">{data.title ? data.title : ""}</h1>
        <h3>repair info</h3>
        <div>
          <span>Repair Id:</span>
          <div className="badge badge-neutral"> {data._id}</div>
        </div>
        <div>
          <span>created by user:</span>
          <div className="badge badge-neutral"> {data.createdBy}</div>
        </div>
        <div>
          <span>engine make:</span>
          <div className="badge badge-neutral"> {data.engineMake}</div>
        </div>
        <div>
          <span>user group:</span>
          <div className="badge badge-neutral"> {data.group}</div>
        </div>
        <div>
          <span>board type:</span>
          <div className="badge badge-neutral"> {data.boardType}</div>
        </div>
      </legend>
      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <ProcedureList list={data.procedureArr} />
      </section>
      {/* if user id matches created by field user can use edit tools */}
      <section>
        {userId == data.createdBy && (
          <EditTools
            data={data}
            editPageUrl={`/repair/edit/${data._id}`}
          />
        )}
      </section>
      <section>
        <Comments />
      </section>
    </section>
  );
};
