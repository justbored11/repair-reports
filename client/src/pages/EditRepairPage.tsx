import { useEffect, useState } from "react";
import RepairEditForm from "../components/RepairDisplay/RepairEditForm";
import useRepairApi from "../hooks/useRepairApi";
import { Repair } from "../classes/Repair";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRepairPage() {
  const { id: repairId } = useParams();
  const { getRepairById, updateRepair } = useRepairApi();
  const [repair, setRepair] = useState<Repair | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitAllowed, setSubmitAllowed] = useState(true);
  const navigate = useNavigate();

  const putRepair = async (repair: Repair) => {
    console.log("update currentFormState", repair);
    try {
      setSubmitAllowed(false);
      await updateRepair(repair);
      setSubmitAllowed(true);
      navigate(`/repair/${repairId}`);
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
        setRepair(data);
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
    <section>
      <h3>Edit Your Repair here</h3>
      {repair && (
        <RepairEditForm
          onSubmit={putRepair}
          repair={repair}
          enabled={submitAllowed}
          submitType="Update"
        />
      )}
    </section>
  );
}
