import { useEffect, useState } from "react";
import RepairEditForm from "../components/RepairDisplay/RepairEditFormV2";
import useRepairApi from "../hooks/useRepairApi";
import { Repair } from "../classes/Repair";
import { useParams, useNavigate } from "react-router-dom";
import { RepairDataT } from "../../types";

import { RepairContextProvider } from "../context/RepairFormContext";

//TODO remove test object
const test = {
  searchTags: [],
  boardType: "other",
  engineMake: "cat",
  group: "public",
  procedureArr: [
    {
      images: [],
      imageObjs: [],
      imagesIdArr: [],
      instructions: "",
      procedureNum: 0,
      thumbs: [],
      _id: "5e127817-6d9b-402f-9ee6-68923982a42a",
    },
    {
      images: [],
      imageObjs: [],
      imagesIdArr: [],
      instructions: "ewdaf",
      procedureNum: 0,
      thumbs: [],
      _id: "7f789fa0-44eb-4a08-a35b-a9020567be45",
    },
  ],
  title: "test",
  _id: "86c0eab7-f7a6-4b79-a713-82c92fbce18b",
};
export default function EditRepairPageV2() {
  const { id: repairId } = useParams();
  const { getRepairById, updateRepair } = useRepairApi();
  const [repair, setRepair] = useState<RepairDataT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitAllowed, setSubmitAllowed] = useState(true);
  const navigate = useNavigate();

  const handleUpdateRepair = async (repair: Repair) => {
    console.log("update currentFormState", repair);
    try {
      setSubmitAllowed(false);
      console.log(repair);

      // await updateRepair(repair);
      // setSubmitAllowed(true);
      // navigate(`/repair/${repairId}`);
    } catch (error) {
      setSubmitAllowed(true);
      console.log("error handleUpdate @RepairPage ", error);
    }
  };

  useEffect(() => {
    if (!repairId) {
      setError("no id provided");
      return;
    }

    // load up repair data
    getRepairById(repairId)
      .then((data) => {
        console.log("data", data);
        setRepair(data as RepairDataT);
      })
      .catch((error) => {
        console.log("error getting repair for edit", error);
        setError(`error getting repair id :${repairId}`);
      });
  }, [repairId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <RepairContextProvider>
      <section>
        <h3
          onClick={() => {
            console.log("repair", repair);
          }}
        >
          Edit Your Repair here V2
        </h3>
        {repair && (
          <RepairEditForm
            onSubmit={handleUpdateRepair}
            //TODO return this
            // repair={repair}
            repair={test}
            enabled={submitAllowed}
            submitType="Update"
          />
        )}
      </section>
    </RepairContextProvider>
  );
}
