// import React from "react";

import CreatableSelect from "react-select/creatable";

import { v4 as uuidv4 } from "uuid";

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
  const inputTitle = title ? title : "multi select";

  const id = uuidv4().slice(0, 5);

  return (
    <div
      data-testid="available-options-multi"
      className="flex flex-col justify-around items-center items-center">
      <div className="flex-1 flex w-11/12 justify-center">
        <span className="text-center">{title}</span>
      </div>
      <div className="flex-1 flex justify-center w-[300px]">
        <CreatableSelect
          isMulti
          className="w-full"
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
      <div className="flex-1 flex justify-center w-[300px]"></div>
    </div>
  );
}
