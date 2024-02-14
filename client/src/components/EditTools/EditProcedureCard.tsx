import React, { Dispatch } from "react";
import { ProcedureT } from "../../hooks/useGetLatest";
import { DispatchType } from "./changeProcedure";
export default function ProcedureEditCard({
  proc,
  updateFn,
}: {
  proc: ProcedureT;
  updateFn: Dispatch<{ type: DispatchType; payload: object }>;
}) {
  const images = proc.images.map((url) => {
    return EditImageCard(url);
  });
  return (
    <li>
      <h1
        onClick={() => {
          updateFn({ type: "test dispatch", payload: { testpayload: "test" } });
        }}
        className="text-xl">
        procedure num is : {proc.procedureNum}
      </h1>
      <ul className=" flex flex-col justify-center align-middle items-center gap-2 w-full p-4  bg-neutral rounded-box">
        {images}
      </ul>
      <section className="">
        <h3 className="text-lg text-gray">Instructions: </h3>

        <textarea
          className="w-3/4 "
          defaultValue={proc.instructions}
          name=""
          id=""
          cols={30}
          rows={10}></textarea>
      </section>
    </li>
  );
}

function EditImageCard(url: string) {
  //todo upload image hook
  return (
    <li
      key={url}
      className="w-3/4 bg-green-400">
      <div className="flex flex-col">
        <img
          src={url}
          className="rounded-box "
        />
        <label
          htmlFor=""
          className="">
          <h3>original url</h3>
          <input
            type="text"
            disabled
            value={url}
          />
        </label>
      </div>
    </li>
  );
}
