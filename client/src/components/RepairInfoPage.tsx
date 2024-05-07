import { RepairDataT } from "../../types";
import Comments from "./Comments/Comments";
import EditTools from "./ProcedureList/EditTools";
import ProcedureList from "./ProcedureList/ProcedureList";

type RepairInfoPageProps = {
  repair: RepairDataT;
  userId: string | undefined;
};

export default function RepairInfoPage({
  repair,
  userId,
}: RepairInfoPageProps) {
  return (
    <section>
      <legend className=" border-4 rounded-lg p-2 border-gray-600">
        <h1 className=" text-4xl">{repair.title ? repair.title : ""}</h1>
        <h3>repair info</h3>
        <div>
          <span>Repair Id:</span>
          <div className="badge badge-neutral"> {repair._id}</div>
        </div>
        <div>
          <span>created by user:</span>
          <div className="badge badge-neutral"> {repair.createdBy}</div>
        </div>
        <div>
          <span>engine make:</span>
          <div className="badge badge-neutral"> {repair.engineMake}</div>
        </div>
        <div>
          <span>user group:</span>
          <div className="badge badge-neutral"> {repair.group}</div>
        </div>
        <div>
          <span>board type:</span>
          <div className="badge badge-neutral"> {repair.boardType}</div>
        </div>
      </legend>
      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <ProcedureList list={repair.procedureArr} />
      </section>
      {/* if user id matches created by field user can use edit tools */}
      <section>
        {userId == repair.createdBy && (
          <EditTools
            data={repair}
            editPageUrl={`/repair/edit/${repair._id}`}
          />
        )}
      </section>
      <section>
        <Comments />
      </section>
    </section>
  );
}
