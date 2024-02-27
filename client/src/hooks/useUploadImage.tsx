// import React from "react";

import useRepairApi from "./useRepairApi";
import { signatureT } from "../api/RepairReportsApi";

export default function useUploadImage() {
  const { getUploadSignature } = useRepairApi();

  return async function uploadImage(imageFile: File, folder: string) {
    const signData = await getUploadSignature(folder);
    // console.log("signData", signData);

    const url =
      "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    const formData = await createForm({ imageFile, signData });

    //upload to cloudinary
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    }).then((data) => data.json());

    return response;

    //   //array of responses after upload
    //   let uploadResponses = await Promise.all(uploadPromisesArr);

    //   const imageurls = uploadResponses.map((response) => {
    //     return response.url;
    //   });

    //   const thumbsLinks = uploadResponses.map((response) => {
    //     return response.url.replace("/upload/", "/upload/c_scale,w_400/");
    //   });

    //   //getting images public id for cloudinary actions
    //   const idList = uploadResponses.map((response) => {
    //     return response.public_id;
    //   });

    //   return {
    //     links: imageurls, //! array of url links to images
    //     thumbs: thumbsLinks, //! array of url links to thumbs
    //     imagesIdArr: idList, //!array of image ids from cloudinary
    //   };
  };
}

// function getImages(element) {
//   let files = [];
//   class imgObj {
//     constructor(imageBuffer = null, isNew = false, url = null) {
//       this.imageBuffer = imageBuffer; //buffer of image if any
//       this.isNew = isNew; //does it need to upload
//       this.url = url; // url if does not need upload
//     }
//   }

//   //all inputs with images even ones that dont need upload
//   const images = element.querySelectorAll("#instructions [type=file]");

//   images.forEach((image) => {
//     //if a file is attached it is new image
//     if (image.files.length > 0) {
//       // files.push(image.files);
//       files.push(new imgObj(image.files, true, null));
//     }
//     //no image attached but does have orig url then its existing image
//     else if (image.files.length === 0 && image.dataset.origurl) {
//       files.push(new imgObj(null, false, image.dataset.origurl));
//     }
//   });

//   return files; //return array of image objects
// }

async function createForm({
  imageFile,
  signData,
}: {
  imageFile: File;
  signData: signatureT;
}) {
  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append("api_key", signData.apikey);
  formData.append("timestamp", String(signData.timestamp));
  formData.append("signature", signData.signature);
  formData.append("folder", signData.folder); //put this file in folder named cata

  return formData;
}
