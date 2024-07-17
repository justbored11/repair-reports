// import React from "react";

import CreatableSelect from "react-select/creatable";

export type OptionT = {
  value: string;
  label: string;
};

export default function AvailableOptions({
  options,
  title,
  callback,
}: {
  options: OptionT[];
  title: string;
  callback?: (optionValue: string) => void;
}) {
  const defaultValue = options && options?.length ? options[0] : undefined;

  const optionsTitle = title ? title : "";
  return (
    <div
      data-testid="available-options-single"
      className="flex flex-col w-full justify-around items-center align-middle ">
      <div className="flex-1 flex justify-end">
        <span className="">{optionsTitle}</span>
      </div>
      <div className="flex-1 flex justify-start">
        <CreatableSelect
          className="single-select"
          defaultValue={defaultValue}
          isClearable
          onChange={(event) => {
            if (callback) callback(event?.value || options[0].value);
          }}
          options={options}
        />
      </div>
    </div>
  );
}
