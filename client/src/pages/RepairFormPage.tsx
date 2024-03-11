import React, { ChangeEvent } from "react";
import AvailableOptions from "../components/AvailableOptions/AvailableOptions";
import EditProcedureList from "../components/ProcedureList/EditProcedureList";
// import { RepairFormContext } from "../context/RepairFormContext";
import useRepairFormState from "../hooks/useRepairFormState";

// const LOC = "@RepairFormPage.tsx";

export default function RepairFormPage(): React.ReactNode {
  // const { formDispatch, currentFormState } = useContext(RepairFormContext);

  const { currentFormState, formDispatch } = useRepairFormState();
  // useEffect(() => {
  //   console.log("currentFormState", currentFormState);
  // }, [currentFormState]);

  // const [currentProcedureList, setProcedureList] = useState(
  //   newRepairObj.procedureArr
  // );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("currentFormState", currentFormState);
    //! NOT USING DATABASE YET
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
    { label: "Cat 70 pin", value: "cat70" },
    { label: "Cat 40 pin", value: "cat40" },
    { label: "DDEC 2", value: "DDEC2" },
    { label: "DDEC 3", value: "DDEC3" },
    { label: "DDEC 4", value: "DDEC4" },
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
      <legend className=" gap-4 flex flex-col rounded-lg p-2 border-gray-600 w-full">
        <div className="flex flex-col w-full justify-around items-center align-middle ">
          <div className="flex-1 flex justify-end">
            <span className="text-4xl w-full text-right">Title:</span>
          </div>
          <div className="flex-1 flex justify-start">
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // console.log("e", e.target.value);

                formDispatch({
                  type: "UPDATE_FIELD",
                  payload: { formField: { title: e.target.value } },
                });
              }}
              className="text-2xl w-full"
              id="title"
              name="title"
              type="text"
              defaultValue={currentFormState.title}
            />
          </div>
        </div>

        <div className="">
          <AvailableOptions
            title="Visibility group"
            options={availableGroups}
            callback={(group: string) => {
              formDispatch({
                type: "UPDATE_FIELD",
                payload: { formField: { group } },
              });
            }}
          />
        </div>
        <div>
          <AvailableOptions
            title="Board Type"
            options={availableBoardTypes}
            callback={(boardType: string) => {
              formDispatch({
                type: "UPDATE_FIELD",
                payload: { formField: { boardType } },
              });
            }}
          />
        </div>
        <div>
          <AvailableOptions
            callback={(engineMake: string) => {
              formDispatch({
                type: "UPDATE_FIELD",
                payload: { formField: { engineMake } },
              });
            }}
            title="Engine make"
            options={availableEngines}
          />
        </div>
      </legend>

      <section>
        <h3 className="text-xl">Repair procedures</h3>
        <EditProcedureList
          formDispatch={formDispatch}
          procedureList={currentFormState.procedureArr}
        />
      </section>
      {/* submit section */}
      <section className="p-3">
        <button
          type="submit"
          className="btn">
          Update
        </button>
      </section>
    </form>
  );
}
