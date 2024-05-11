import React, { useState, useRef, useEffect } from "react";
// import useUploadImage from "../../hooks/useUploadImage";
import { CameraPreview } from "./CameraPreview";
import { ImageObjT } from "../../../types";
import { useDebouncedCallback } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import useImageManager from "../../hooks/useImageManager";
import { ImageObj, UploadStatus } from "../../classes/ImageObj";
import UploadStatusBar from "./UploadStatusBar";
import useCreateThumbUrl from "../../hooks/useCreateThumbUrl";

// enum UploadStatus {
//   SUCCESS,
//   UPLOADING,
//   ERROR,
//   IDLE,
//   DELETING,
// }

export function EditImageCard({
  url = "",
  setFormImageObj,
  onRemove,
  imageData,
}: {
  id: string;
  url: string;
  onRemove?: () => void;
  imageData: ImageObj;
  setFormImageObj: (imageObj: ImageObjT) => void; //external state setter to manipulate url prop
}) {
  //
  const { uploadImage, deleteImage } = useImageManager();
  const createThumbUrl = useCreateThumbUrl();

  const [isDeletable, setIsDeletable] = useState(url.includes("http"));
  const [isUploadable, setIsUploadable] = useState(url.includes("data:"));

  //will hold <video> tag reference
  const videoRef = useRef<HTMLVideoElement | null>(null);

  //camera stream
  const mediaStreamRef = useRef<MediaStream | null>(null);

  //is camera active
  const [activeCamera, setActiveCamera] = useState(false);

  //image has been uploaded and have imageObj or null
  //after image is uploaded store details
  const [imageUploadedObj, setImageUploadedObj] = useState<null | ImageObjT>(
    imageData
  );

  //show status of image action
  const [imageUploadStatus, setImageUploadStatus] = useState<UploadStatus>(
    isDeletable ? "SUCCESS" : "IDLE"
  );

  //number to track percentage of image action progress
  const [uploadProgress, setUploadProgress] = useState(10);

  //new image to upload stored locally
  const [imageToUpload, setImageToUpload] = useState<File | string>(url);

  //image preview of file selected or image captured from camera
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    url
  );

  //close camera tracks and turn off video stream on dismount
  useEffect(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      videoRef.current = null;
    }

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        videoRef.current = null;
      }
    };
  }, []);

  const handleUrlChange = useDebouncedCallback(
    (urlText: string | null | ArrayBuffer) => {
      if (typeof urlText != "string") {
        alert("image url is not in text form");
        return;
      }

      //url changed of image either manually or file changed
      setFormImageObj({
        folder: "testFolder",
        imageId: imageUploadedObj ? imageUploadedObj.imageId : urlText,
        imageUrl: urlText,
      });
    },
    300
  );

  const handleImageUpload = useDebouncedCallback(async (folder: string) => {
    setImageUploadStatus("UPLOADING");
    setUploadProgress(30);

    if (
      (typeof imageToUpload == "string" && imageToUpload.length > 6) ||
      typeof imageToUpload == "object"
    ) {
      setUploadProgress(50);
      try {
        const response = await uploadImage(imageToUpload, folder);

        // console.log("response image", response);
        if (!response) {
          console.log("no response from axios");
          return;
        }

        const {
          url,
          public_id,
          folder: uploadFolder,
        }: { url: string; public_id: string; folder: string } = response.data;
        console.log("response", response);

        //todo get thumbnail url
        const thumbUrl = createThumbUrl(url);
        console.log("thumbUrl", thumbUrl);

        const imageObj: ImageObjT = {
          imageUrl: url,
          imageId: public_id,
          folder: uploadFolder,
          imageThumb: thumbUrl,
        };
        setUploadProgress(70);
        setFormImageObj(imageObj);
        setImageUploadedObj(imageObj);
        setUploadProgress(100);
        setImageUploadStatus("SUCCESS");
        setIsUploadable(false);
        setIsDeletable(true);
        return;
      } catch (error) {
        console.log("error uploading", error);
        setImageUploadStatus("ERROR");
        //todo set alert of failed upload
        return;
      }
    }

    alert("no image to upload");
  }, 1000);

  //handle delete of image from database and state
  const handleImageDelete = async () => {
    // if image has been uploaded delete from database

    if (isDeletable && imageUploadedObj) {
      try {
        const deleteResponse = await deleteImage({
          imageId: imageUploadedObj.imageId,
        });
        console.log("deleteResponse", deleteResponse);
        setImageUploadedObj(null);
        if (onRemove) onRemove();
      } catch (error) {
        // reset image obj and do not remove from dom
        alert("failed to delete image");
        // setImageUploadedObj(imageUploadedObj);
        return;
      }
    } else {
      if (onRemove) onRemove();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    //check input element for files
    const imageFile = event.target.files && event.target.files[0];

    //turn off camera incase its on
    setActiveCamera(false);

    if (imageFile) {
      const reader = new FileReader();

      setImageToUpload(imageFile);

      //registering callback when event onloadend happens
      reader.onloadend = async () => {
        //event will trigger and reader.result will have data:URL
        setImagePreview(reader.result);

        handleUrlChange(reader.result);

        //reset state to not uploaded yet state
        setImageUploadedObj(null);
      };

      //read the file data and trigger onloadend event
      reader.readAsDataURL(imageFile);
      setIsUploadable(true);
    }
  };

  const toggleCamera = async () => {
    if (activeCamera) {
      setActiveCamera(false);

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        videoRef.current = null;
      }

      return;
    }

    setActiveCamera(true);
    try {
      //get users camera if available
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      //if a ref has a node currently set, give it the camera stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStreamRef.current;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureFrame = async () => {
    //create a canvas to view camera stream
    const canvas = document.createElement("canvas");

    //if currently holds a reference to <video>
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      //grab current from from canvas
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

      //grab current view displayed on canvas from camera
      const dataUrl = canvas.toDataURL("image/png");

      const blobData = await fetch(dataUrl).then((res) => res.blob());

      const imageFileFromBlob = new File([blobData], "image.jpg");
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        videoRef.current = null;
      }

      setImageToUpload(imageFileFromBlob);

      //once image is captured set preview and close camera
      setImagePreview(dataUrl);
      setActiveCamera(false);
      handleUrlChange(dataUrl);
      setImageUploadedObj(null);
    }
  };

  return (
    <div
      key={uuidv4()}
      className="">
      <h3>image id :{imageUploadedObj?.imageId}</h3>
      {/* delete x button */}
      <div
        onClick={handleImageDelete}
        className="btn btn-circle z-10 bg-yellow-600 absolute right-0 hover:bg-red-600 hover:scale-125">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      {/* alerts and status */}
      <section className=" flex flex-col items-center h-1/8 relative">
        {/* upload progress bar */}
        <div className=" absolute">
          <UploadStatusBar
            progress={uploadProgress}
            status={imageUploadStatus}
          />
        </div>
      </section>

      {/* image preview or camera preview */}
      <div className="flex flex-col max-w-[500px] h-5/6 items-center">
        {/* camera of image preview */}
        <div className="w-full flex flex-col justify-center items-center h-5/6">
          <div className="h-4/6">
            {imagePreview && !activeCamera ? (
              <section className="w-full flex flex-col  h-full">
                <img
                  className=" h-full"
                  src={imagePreview.toString()}
                  alt="Preview"
                />
              </section>
            ) : null}

            {activeCamera && (
              <section className=" flex flex-col border-solid border-2 border-cyan-400 h-full">
                <div className="w-full h-5/6">
                  <CameraPreview videoRef={videoRef} />
                </div>

                <div
                  className="btn h-1/6"
                  onClick={captureFrame}>
                  capture
                </div>
              </section>
            )}
          </div>
          <section className="flex w-full h-2/6 item-center justify-center ">
            {/* //! manaul image url input */}
            {/* <div className="items-center ">
              Image URL
              <textarea
                onChange={(event) => {
                  // event.preventDefault();
                  const text = event.target.value;
                  setImagePreview(text);
                  handleUrlChange(text);
                }}
                wrap="true"
                // defaultValue={url}
                defaultValue={
                  typeof imagePreview == "string"
                    ? imagePreview
                    : "no image url"
                }
                // value={url}
                cols={30}
                className="textarea textarea-bordered w-full"
                placeholder="URL"></textarea>
            </div> */}
          </section>
        </div>

        {/* edit tools */}
        <div className="text-black border-2 border-s-violet-100 w-full">
          <h3 className=" bg-gray-700">Edit Tools</h3>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div
            className="btn btn-sm"
            onClick={toggleCamera}>
            {!activeCamera ? "open camera" : "close camera"}
          </div>

          {isUploadable && (
            <div
              onClick={() => {
                handleImageUpload("testfolder");
              }}
              className="btn btn-sm">
              Manual Upload Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
