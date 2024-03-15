// import React from "react";

import CreatableSelect from "react-select/creatable";

export type OptionT = {
  value: string;
  label: string;
};

export default function AvailableOptionsMulti({
  options,
  title,
  callback,
}: // defaultValue,
{
  options: OptionT[];
  title: string;
  callback?: (options: string[]) => void;
  // defaultValue?: OptionT[];
}) {
  return (
    <div className="flex flex-col w-full justify-around items-center align-middle">
      <div className="flex-1 flex w-11/12 justify-center">
        <span className="text-center">{title}</span>
      </div>
      <div className="flex-1 flex justify-center w-[300px]">
        <CreatableSelect
          isMulti
          className=" w-full"
          // defaultValue={defaultValue ? defaultValue : options[0]}
          isClearable
          onChange={(options) => {
            // if (callback) callback(options);
            const tags = options.map((tagObj) => {
              return tagObj.value;
            });
            console.log("tags", tags);

            if (callback) callback(tags);

            return;
          }}
          options={options}
        />
      </div>
    </div>
  );
}
