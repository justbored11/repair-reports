// @ts-expect-error
import React from "react";

export function AvailableEnginesSelect({
  defaultValue,
}: {
  defaultValue: string;
}) {
  return (
    <div>
      <span>engine make:</span>
      <select className="select select-info w-full max-w-xs">
        <option
          id="original"
          value={defaultValue}
          selected>
          Original: {defaultValue}
        </option>
        <option
          id="cat"
          value="cat">
          Caterpillar
        </option>
        <option
          id="cummins"
          value="cummins">
          Cummins
        </option>
        <option
          id="detroit"
          value="detroit">
          Detroit
        </option>
        <option
          id="other"
          value="other">
          Other
        </option>
      </select>

      {/*//todo input for enginemake */}

      {/* <section className="container blue-grey darken-1">
    <fieldset className="border engine-models">
      <legend>Choose Engine</legend>
      <span>
        <label htmlFor="cat">
          <div className="badge badge-accent">
            <input
              id="cat"
              name="model"
              value="cat"
              type="radio"
              className=" model radio"
            />
            Caterpillar
          </div>
        </label>
      </span>
      <span>
        <label htmlFor="detroit">
          <div className="badge badge-accent">
            <input
              id="detroit"
              value="detroit"
              name="model"
              type="radio"
              className=" model radio"
            />
            Detroit
          </div>
        </label>
      </span>

      <span>
        <label htmlFor="cummins">
          <div className="badge badge-accent">
            <input
              id="cummins"
              value="cummins"
              name="model"
              type="radio"
              className=" model radio"
            />
            <span>Cummins</span>
          </div>
        </label>
      </span>

      <span>
        <label htmlFor="other">
          <div className="badge badge-accent">
            <input
              id="other"
              name="model"
              value="other"
              type="radio"
              className=" model radio"
            />
            <span>Other</span>
          </div>
        </label>
      </span>
    </fieldset>
  </section> */}
      {/* end */}
    </div>
  );
}
