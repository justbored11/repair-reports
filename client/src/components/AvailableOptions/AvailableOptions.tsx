// import React from "react";

import CreatableSelect from "react-select/creatable";

type selectionT = {
  value: string;
  label: string;
};

export default function AvailableOptions({
  options,
  title,
  callback,
}: {
  options: selectionT[];
  title: string;
  callback?: (engineSelected: string) => void;
}) {
  // const selections = options.map((item: selectionT) => {
  //   return createOption(item);
  // });
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
      {/* <select
        onChange={(event) => {
          console.log("event select", event.target.value);

          if (callback) callback(event.target.value || options[0].value);
        }}
        name={name}
        className="select select-info w-full max-w-xs">
        {selections}
      </select> */}
    </div>
  );
}
