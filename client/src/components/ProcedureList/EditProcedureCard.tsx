import React, { useContext, useEffect, useState } from "react";

import { EditImageCard } from "../ImageCard/EditImageCard";
import { v4 as uuidv4 } from "uuid";
import { ImageObjT, ProcedureT } from "../../../types";
import { ImageObj } from "../../classes/ImageObj";
import ModalConfirm from "../Modals/ModalConfirm";
import { Procedure } from "../../classes/Procedure";
import { RepairFormDataContext } from "../../context/RepairFormContext";
import useImageManager from "../../hooks/useImageManager";

type ImageCardListT = { _id: string; component: React.ReactNode };

export default function EditProcedureCard({
  procedureData = new Procedure(),
  id = uuidv4(),
  onRemove,
}: {
  procedureData: ProcedureT;
  id?: string;
  onRemove?: () => void;
}) {
  const { formAction } = useContext(RepairFormDataContext);
  const { updateInstructions } = formAction;
  const { imageObjs } = procedureData; //TODO images on procedure
  const PROCEDURE_ID = procedureData._id ? procedureData._id : id;
  const { deleteImage } = useImageManager();

  const [instructions, setInstructions] = useState(procedureData.instructions);

  const [imageCards, setImageCards] = useState<ImageCardListT[]>([]);

  //load initial state after mount
  useEffect(() => {
    //create cards for initial prop data passed in
    const initialImageCardData: ImageCardListT[] = imageObjs.map((data) => {
      const component = createEditImageCard({
        procedureId: PROCEDURE_ID,
        imageObj: new ImageObj(data),
        setter: setImageCards,
      });
      return { _id: data._id, component };
    });
    setImageCards(initialImageCardData);
  }, []);

  async function handleDeleteImage(imageObj: ImageObjT) {
    // console.log("delete image");

    const procedureId = id;
    //delete from database
    await deleteImage({ imageId: imageObj.imageId });

    //remove from formcontext
    formAction.removeImage(imageObj._id, procedureId);

    //remove from dom
    setImageCards((state) => {
      return state.filter((data) => {
        if (data._id == imageObj._id) return false;

        return true;
      });
    });
  }

  async function handleRemoveProcedure() {
    const promises: Promise<void>[] = [];

    //delete images from database promises
    imageObjs.forEach((data) => {
      //only delete if url is http and not data: buffer
      if (data.imageUrl.includes("http")) {
        promises.push(handleDeleteImage(data));
      }
    });

    if (promises.length > 0) await Promise.allSettled(promises);

    if (onRemove) {
      onRemove();
    }
  }

  return (
    <div className="p-3 card relative border border-solid border-slate-700">
      {/* delete procedure button */}

      <ModalConfirm label="Remove procedure">
        <section>
          <span>Confirm: </span>
        </section>

        <section className="flex justify-center">
          <div
            onClick={() => {
              handleRemoveProcedure();
            }}
            className="btn bg-yellow-600 hover:bg-red-600 hover:scale-125 w-40 text-black">
            Remove procedure
          </div>
        </section>
      </ModalConfirm>

      {/* edit image cards */}
      <section>
        <h1 className="text-xl">procedure num is </h1>
        <h1 className="text-xl">procedure ID is : {PROCEDURE_ID}</h1>
        <ul className=" w-full flex flex-wrap justify-center align-middle items-center gap-2 p-4  bg-neutral rounded-box">
          {imageCards.map((item) => item.component)}
          <section>
            <div>
              <span>Add another image</span>
              <div
                onClick={() => {
                  //todo add image data to formContext
                  console.log("adding image to procedure");

                  const newImageData = new ImageObj();
                  formAction.addImage(newImageData, PROCEDURE_ID);

                  setImageCards((state) => {
                    //data
                    //function component
                    const newImageCard = createEditImageCard({
                      procedureId: PROCEDURE_ID,
                      imageObj: newImageData,
                      setter: setImageCards,
                    });

                    //format for storing in state
                    const newItem: ImageCardListT = {
                      _id: newImageData._id,
                      component: newImageCard,
                    };
                    return [...state, newItem];
                  });
                }}
                className="text-xl btn btn-active btn-accent hover:bg-green-300">
                +
              </div>
            </div>
          </section>
        </ul>
      </section>

      {/* INSTRUCTIONS */}
      <section className=" w-full flex flex-col items-center">
        <h3 className="text-lg text-gray">Instructions: </h3>
        <textarea
          onChange={(e) => {
            e.preventDefault();
            // handleInstructionsUpdate(e.target.value);
            const text = e.target.value;
            setInstructions(() => {
              updateInstructions(id, text);
              return text;
            });
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

// export default function EditProcedureCard({
//   procedureData = new Procedure(),
//   id = uuidv4(),
//   procedureActions,
// }: {
//   procedureData: ProcedureT;
//   id: string;
//   procedureActions?: {
//     instructions: (text: string) => void;
//     addImage: () => void;
//     editImage: (imageIndex: number, updatedImageObj: ImageObj) => void;
//     removeImage: (imageId: string) => void;
//     removeProcedure: () => void;
//   };
// }) {
//   //index to number to be used as reference of updating state array of the proceduresArray
//   const PROCEDURE_INDEX = Number(id);
//   const PROCEDURE_ID = procedureData._id;

//   const { deleteImage } = useImageManager();

//   // const { formDispatch } = useContext(RepairFormContext);

//   const [instructions, setInstructions] = useState(procedureData.instructions);
//   const { imageObjs } = procedureData;

//   const imageCards = createEditImageCards({
//     imageObjs: imageObjs,
//     updateUrl: procedureActions.editImage,
//     onRemove: procedureActions.removeImage,
//   });

//   const handleInstructionsUpdate = useDebouncedCallback((text: string) => {
//     procedureActions.instructions(text);
//   }, 0);

//   const handleRemoveProcedure = async () => {
//     //remove images if needed
//     if (procedureData.imageObjs && procedureData.imageObjs.length > 0) {
//       console.log("procedureData", procedureData.imageObjs);

//       try {
//         const imagesDataArr = procedureData.imageObjs;
//         const promises = imagesDataArr.map((data) => {
//           console.log("removing id: ", data.imageId);

//           return deleteImage({ imageId: data.imageId });
//         });

//         await Promise.allSettled(promises);
//       } catch (error) {
//         console.log("error deleting multiple images", error);
//       }
//     }

//     //remove actual procedure component
//     procedureActions.removeProcedure();
//   };

//   return (
//     <div className="p-3 card relative border border-solid border-slate-700">
//       {/* delete procedure button */}

//       <ModalConfirm label="Remove procedure">
//         <section>
//           <span>Confirm: </span>
//         </section>

//         <section className="flex justify-center">
//           <div
//             onClick={() => {
//               handleRemoveProcedure();
//             }}
//             className="btn bg-yellow-600 hover:bg-red-600 hover:scale-125 w-40 text-black">
//             Remove procedure
//           </div>
//         </section>
//       </ModalConfirm>

//       {/* edit image cards */}
//       <section>
//         <h1 className="text-xl">procedure num is : {PROCEDURE_INDEX}</h1>
//         <h1 className="text-xl">procedure ID is : {PROCEDURE_ID}</h1>
//         <ul className=" w-full flex flex-wrap justify-center align-middle items-center gap-2 p-4  bg-neutral rounded-box">
//           {imageCards}
//           <section>
//             <div>
//               <span>Add another image</span>
//               <div
//                 onClick={() => {
//                   procedureActions.addImage();
//                 }}
//                 className="text-xl btn btn-active btn-accent hover:bg-green-300">
//                 +
//               </div>
//             </div>
//           </section>
//         </ul>
//       </section>

//       {/* INSTRUCTIONS */}
//       <section className=" w-full flex flex-col items-center">
//         <h3 className="text-lg text-gray">Instructions: </h3>
//         <textarea
//           onChange={(e) => {
//             e.preventDefault();
//             handleInstructionsUpdate(e.target.value);
//             setInstructions(e.target.value);
//           }}
//           className="w-3/4 "
//           value={instructions}
//           name=""
//           id=""
//           cols={30}
//           rows={10}></textarea>
//       </section>
//     </div>
//   );
// }

// const newImageData = new ImageObj();
//                     const newItem: ImageCardListT = {
//                       _id: newImageData._id,
//                       component: (
//                         <EditImageCard
//                           url={newImageData.imageUrl}
//                           id={newImageData._id}
//                           imageData={newImageData}
//                           setFormImageObj={() => {
//                             console.log("no setform yet on imagecard");
//                           }}
//                         />
//                       ),
//                     };

//create image card components
function createEditImageCard({
  imageObj,
  procedureId,
  setter,
}: {
  imageObj: ImageObj;
  procedureId: string;
  setter: React.Dispatch<React.SetStateAction<ImageCardListT[]>>;
}) {
  return (
    <li
      className="w-full card md:w-1/3 bg-slate-700 p-2"
      key={uuidv4()}>
      <EditImageCard
        procedureId={procedureId}
        imageData={imageObj}
        id={imageObj._id}
        key={uuidv4()}
        url={imageObj.imageUrl}
        onRemove={() => removeItem(setter, imageObj._id)}
      />
    </li>
  ) as React.ReactNode;
}

function removeItem(
  setter: React.Dispatch<React.SetStateAction<ImageCardListT[]>>,
  id: string
) {
  setter((state) => {
    const newState = state.filter((imageCard) => {
      if (imageCard._id == id) return false;
      return true;
    });

    return newState;
  });
}
