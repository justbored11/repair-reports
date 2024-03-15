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
  callback?: (engineSelected: string) => void;
}) {
  return (
    <div className="flex flex-col w-full justify-around items-center align-middle ">
      <div className="flex-1 flex justify-end">
        <span className="">{title}</span>
      </div>
      <div className="flex-1 flex justify-start">
        <CreatableSelect
          className=" "
          defaultValue={options[0]}
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
