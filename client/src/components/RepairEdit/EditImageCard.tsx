// @ts-expect-error 'react is used'
import React from "react";

export function EditImageCard({
  url,
  setUrl,
}: {
  url: string;
  setUrl: (newUrl: string) => void;
}) {
  console.log("setUrl", setUrl);
  return (
    <div
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
        <label
          htmlFor=""
          className="text-black border-2 border-s-violet-100">
          <h3>Replace image</h3>
          <input
            type="file"
            accept="image/*"
          />
        </label>
      </div>
    </div>
  );
}
