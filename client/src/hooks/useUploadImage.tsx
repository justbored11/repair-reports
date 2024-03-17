// import React from "react";
import axios, { AxiosError } from "axios";

import useRepairApi from "./useRepairApi";
import { signatureT } from "./useRepairApi";
import useAuthContext from "./useAuthContext";

export default function useUploadImage() {
  const { getUploadSignature } = useRepairApi();
  const { unauthorizedError } = useAuthContext();

  return async function uploadImage(imageFile: File | string, folder: string) {
    let signData;
    try {
      signData = await getUploadSignature(folder);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status && error?.response?.status == 401) {
          console.log(
            "error getting signature for image upload @useUploadImage"
          );

          // console.log("error.status", error?.response?.status);
          unauthorizedError();
        }
      }
      console.log(
        "unspecified axios error @useUploadImage sending to cloudinary",
        error
      );
      return;
    }

    const url =
      "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";

    const formData = await createForm({ imageFile, signData });

    //upload to cloudinary
    const response = axios.post(url, formData);
    return response;
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
  imageFile: File | string;
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
