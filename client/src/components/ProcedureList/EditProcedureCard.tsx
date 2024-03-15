import { useState } from "react";
// import { RepairFormContext } from "../../context/RepairFormContext";

import { EditImageCard } from "../ImageCard/EditImageCard";
import { v4 as uuidv4 } from "uuid";
import { useDebouncedCallback } from "use-debounce";
import { ImageObjT, ProcedureT } from "../../../types";

export default function EditProcedureCard({
  proc,
  index,
  updateProcedure,
}: {
  proc: ProcedureT;
  index: number;
  updateProcedure: {
    instructions: (text: string) => void;
    addImage: () => void;
    editImage: (imageIndex: number, updatedImageObj: ImageObjT) => void;
  };
}) {
  //index to number to be used as reference of updating state array of the proceduresArray
  const PROCEDURE_INDEX = Number(index);

  // const { formDispatch } = useContext(RepairFormContext);

  const [instructions, setInstructions] = useState(proc.instructions);
  const images = proc.images;

  const imageCards = createEditImageCards({
    imageUrls: images,
    updateUrl: updateProcedure.editImage,
  });

  const handleInstructionsUpdate = useDebouncedCallback((text: string) => {
    updateProcedure.instructions(text);
  }, 0);

  return (
    <div className="bg-blue-900 p-3 card">
      <section>
        <h1 className="text-xl">procedure num is : {PROCEDURE_INDEX}</h1>
        <ul className=" w-full flex flex-wrap justify-center align-middle items-center gap-2 p-4  bg-neutral rounded-box">
          {imageCards}
        </ul>
        {/* add another image to this list of images and use placeholder url in meantime */}
        <section>
          <div>
            <span>Add another image</span>
            <div
              onClick={() => {
                updateProcedure.addImage();
              }}
              className="text-xl btn btn-active btn-accent hover:bg-green-300">
              +
            </div>
          </div>
        </section>
      </section>

      {/* INSTRUCTIONS */}
      <section className=" w-full flex flex-col items-center">
        <h3 className="text-lg text-gray">Instructions: </h3>
        <textarea
          onChange={(e) => {
            e.preventDefault();
            handleInstructionsUpdate(e.target.value);
            setInstructions(e.target.value);
          }}
          className="w-3/4 "
          value={instructions}
          name=""
          id=""
          cols={30}
          rows={10}></textarea>
      </section>
    </div>
  );
}

function createEditImageCards({
  imageUrls,
  updateUrl,
}: {
  imageUrls: string[];
  updateUrl: (imageIndex: number, newImageObj: ImageObjT) => void;
}) {
  const imageCards = imageUrls.map((url, index) => {
    // high order function to update url
    const updateImageUrl = ({ imageUrl, imageId, folder }: ImageObjT) => {
      updateUrl(index, { imageUrl, imageId, folder });
    };

    return (
      <li
        className="w-full card md:w-1/3 bg-slate-700 p-2"
        key={uuidv4()}>
        <EditImageCard
          key={uuidv4()}
          url={url}
          setFormImageUrl={updateImageUrl}
        />
      </li>
    );
  });

  return imageCards;
}
