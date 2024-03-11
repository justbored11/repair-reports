import React, { createContext } from "react";
import useRepairFormState, {
  RepairFormT,
  Repair,
} from "../hooks/useRepairFormState";
import { RepairFormDispatchT } from "../../types";

interface RepairFormContextT {
  currentFormState: RepairFormT;
  formDispatch: RepairFormDispatchT;
}

export const RepairFormContext = createContext<RepairFormContextT>({
  currentFormState: new Repair(),
  formDispatch: () => {},
});

export const RepairFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentFormState, formDispatch } = useRepairFormState();

  //! have the current form state be updated by children
  //! but not referenced by them to prevent rerender
  //! each child will have its own state and mirror it to the state when changed

  // useEffect(() => {
  //   console.log("currentFormState @RepairFormContext", currentFormState);
  // }, [currentFormState]);

  const values: RepairFormContextT = {
    currentFormState,
    formDispatch,
  };

  return (
    <RepairFormContext.Provider value={values}>
      <>{children}</>
    </RepairFormContext.Provider>
  );
};
