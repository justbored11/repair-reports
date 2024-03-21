// import React from "react";
import axios, { AxiosError } from "axios";

import useRepairApi from "./useRepairApi";
import { signatureT } from "../../types";
import useAuthContext from "./useAuthContext";

const IMAGE_API_URL = import.meta.env.VITE_API_URL;

export default function useImageManager() {
  const { getUploadSignature } = useRepairApi();
  const { unauthorizedError } = useAuthContext();

  async function uploadImage(imageFile: File | string, folder: string) {
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
    const response = await axios.post(url, formData);
    console.log("response", response);
    return response;
  }

  async function deleteImage(imageUrl: string) {
    //   "public_id": "testfolder/voxv6ccg3pz15uqsyrfb",
    // "url": "http://res.cloudinary.com/da6jwh1id/image/upload/v1710692119/testfolder/voxv6ccg3pz15uqsyrfb.png",

    const url = `${IMAGE_API_URL}/images`;

    //upload to cloudinary
    const response = axios.delete(url, {
      data: imageUrl,
      withCredentials: true,
    });

    return response;
  }

  return { uploadImage, deleteImage };
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

//image upload response
// {
//   "asset_id": "bb3498945289512b8d701676d3705cab",
//   "public_id": "testfolder/voxv6ccg3pz15uqsyrfb",
//   "version": 1710692119,
//   "version_id": "fd7dbdc31fdec140e27a3bcb6f4b5372",
//   "signature": "065bdfead0e493b97f2ceb92f2efec9c0d6eaec6",
//   "width": 640,
//   "height": 480,
//   "format": "png",
//   "resource_type": "image",
//   "created_at": "2024-03-17T16:15:19Z",
//   "tags": [],
//   "bytes": 404617,
//   "type": "upload",
//   "etag": "6a9abfb0e592e780b16099df1a8f41cf",
//   "placeholder": false,
//   "url": "http://res.cloudinary.com/da6jwh1id/image/upload/v1710692119/testfolder/voxv6ccg3pz15uqsyrfb.png",
//   "secure_url": "https://res.cloudinary.com/da6jwh1id/image/upload/v1710692119/testfolder/voxv6ccg3pz15uqsyrfb.png",
//   "folder": "testfolder",
//   "original_filename": "image",
//   "original_extension": "jpg",
//   "api_key": "492571145989964"
// }
