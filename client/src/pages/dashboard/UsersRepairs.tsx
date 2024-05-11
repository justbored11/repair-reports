import { v4 as uuidv4 } from "uuid";
import { Repair } from "../../classes/Repair";
import { RepairCard } from "../../components/RepairList/RepairCard";
import { RepairEditControls } from "./RepairEditControls";
type UsersRepairsProps = {
  repairList: Repair[];
};

export type ControlOption = {
  name: string;
  action: () => void;
};

const controls: ControlOption[] = [
  {
    name: "view",
    action: () => {
      console.log("view button");
    },
  },
  {
    name: "edit",
    action: () => {
      console.log("edit button");
    },
  },
  {
    name: "delete",
    action: () => {
      console.log("delete button");
    },
  },
];

export default function UsersRepairs({ repairList = [] }: UsersRepairsProps) {
  return (
    <div>
      <h3>Your Repairs</h3>
      <section>
        <RepairsList
          controls={controls}
          repairList={repairList}
        />
      </section>
    </div>
  );
}

function RepairsList({
  controls,
  repairList,
}: {
  controls: ControlOption[];
  repairList: Repair[];
}) {
  //create react components
  const list = repairList.map((repairObj) => {
    //find first procedure to get image, title and summary from
    const procedure =
      repairObj?.procedureArr.length > 0
        ? repairObj?.procedureArr[0]
        : undefined;

    //find first imageobj in procedure
    const imageObj =
      procedure && procedure.imageObjs.length > 0
        ? procedure.imageObjs[0]
        : undefined;

    //get url
    const url = imageObj?.imageThumb ? imageObj?.imageThumb : undefined;

    const title = repairObj?.title ? repairObj?.title : "no title";

    const summary = procedure?.instructions
      ? procedure?.instructions
      : undefined;

    return (
      <li
        className="sm:w-full md:w-1/2 lg:w-1/5 p-1"
        key={uuidv4()}>
        <div className="relative h-full">
          <div className="card-actions justify-end absolute h-full flex z-[21] right-0 ">
            <RepairEditControls controls={controls} />
          </div>
          <RepairCard
            title={title}
            previewUrl={url}
            summary={summary}
          />
        </div>
      </li>
    );
  });

  return <ul className="flex flex-wrap w-full items-center ">{list}</ul>;
}
