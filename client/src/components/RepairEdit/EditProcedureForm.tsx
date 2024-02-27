import React from "react";
import { ProcedureT } from "../../hooks/useGetLatest";
import { DispatchType, updateProcDispT } from "../../hooks/useUpdateProcedures";
import { EditImageCard } from "./EditImageCard";

export default function EditProcedureForm({
  proc,
  reducer,
  index,
}: {
  proc: ProcedureT;
  reducer: updateProcDispT;
  index: number;
}) {
  //! use reducer and remove this state state will become const and update as necessary
  // const [imageUrls, setImageUrls] = useState(proc.images);

  //coarse index to number to be used as reference of updating state array of the proceduresArray
  const PROCEDURE_INDEX = Number(index);

  const imageCards = createEditImageCards({
    imageUrls: proc.images,
    reducer: reducer,
    procIndex: PROCEDURE_INDEX,
  });

  const handleInstructChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    // console.log("event.target.value", e.target.value);
    reducer({
      type: DispatchType.UPDATE_INTRUC,
      payload: { procIndex: PROCEDURE_INDEX, instructions: e.target.value },
    });
  };

  return (
    <li>
      <section>
        <h1 className="text-xl">procedure num is : {proc.procedureNum}</h1>
        <ul className=" flex flex-col justify-center align-middle items-center gap-2 w-full p-4  bg-neutral rounded-box">
          {imageCards}
        </ul>
        {/* add another image to this list of images and use placeholder url in meantime */}
        <section>
          <div>
            <span>upload another image</span>
            <input
              type="file"
              accept="image/*"
              id="newImage"
            />
          </div>
        </section>
      </section>

      {/* INSTRUCTIONS */}
      <section className="">
        <h3 className="text-lg text-gray">Instructions: </h3>
        <textarea
          onChange={handleInstructChange}
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

// function addNewImage(
//   setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
// ) {
//   setImageUrls((state) => [...state, "#"]);

//   return;
// }

// imageUrls:proc.images, reducer:reducer, procIndex:PROCEDURE_INDEX
//! use only the reducer here not set state redundant
function createEditImageCards({
  procIndex,
  reducer,
  imageUrls,
}: {
  imageUrls: string[];
  procIndex: number;
  // setImageUrls: React.Dispatch<React.SetStateAction<string[]>>,
  reducer: updateProcDispT;
}) {
  //
  const imageCards = imageUrls.map((url, index) => {
    // setting up the function so component doesnt need to know what index it is in array
    const updateUrl = (newUrl: string) => {
      //update image array at index based on map index
      reducer({
        type: DispatchType.UPDATE_IMAGES,
        payload: {
          newImageUrl: newUrl,
          procIndex: procIndex,
          newImageIndex: index,
        },
      });
    };

    return (
      <li key={url}>
        <EditImageCard
          url={url}
          setUrl={updateUrl}
        />
      </li>
    );
  });

  return imageCards;
}
