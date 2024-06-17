import { useState } from "react";
import { Repair } from "../classes/Repair";
import RepairEditForm from "../components/RepairDisplay/RepairEditFormV2";
import useRepairApi from "../hooks/useRepairApi";
import { useNavigate } from "react-router-dom";
import { RepairContextProvider } from "../context/RepairFormContext";
import { RepairDataT } from "../../types";

export default function RepairFormPage(): React.ReactNode {
  const { postRepair } = useRepairApi();
  const [submitAllowed, setSubmitAllowed] = useState(true);
  const navigate = useNavigate();

  const newRepair = new Repair() as unknown as RepairDataT;

  const createRepair = async (repair: Repair) => {
    console.log("update currentFormState", repair);
    try {
      setSubmitAllowed(false);
      const res = await postRepair(repair);
      const { repairId } = res;

      setSubmitAllowed(true);
      navigate(`/repair/${repairId}`);
    } catch (error) {
      setSubmitAllowed(true);
      console.log("error handleUpdate @RepairPage ", error);
    }
  };
  return (
    <RepairContextProvider>
      <h1>Create new repair</h1>

      <RepairEditForm
        onSubmit={createRepair}
        enabled={submitAllowed}
        submitType="Create"
        repair={newRepair}
      />
    </RepairContextProvider>
  );
}
