import React, { useEffect, useState, useRef } from "react";
import useUploadImage from "../../hooks/useUploadImage";
import { CameraPreview } from "./CameraPreview";

export function EditImageCard({
  url,
  setUrl,
}: {
  url: string;
  setUrl: (newUrl: string) => void; //external state setter to manipulate url prop
}) {
  const uploadImage = useUploadImage();
  //will show image of what has been captured by camera or url, or empty
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    url
  );

  //is camera active
  const [activeCamera, setActiveCamera] = useState(false);

  //new image to upload
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);

  // useEffect(() => {
  //   console.log("imageToUpload", imageToUpload);
  // }, [imageToUpload]);

  //ref used to interact with node that is rendered to dom and get its current properties
  //will hold <video> tag reference
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleImageUpload = async (folder: string) => {
    //todo allow upload state to keep from doing requests over and over
    if (imageToUpload) {
      try {
        const response = await uploadImage(imageToUpload, folder);
        // console.log("response from image upload: ", response);
        setUrl(response.url); //update with new url
        return;
      } catch (error) {
        console.log("error uploading", error);
        //todo set alert of failed upload
        return;
      }
    }
    alert("no image to upload");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      };

      //read the file data and trigger onloadend event
      reader.readAsDataURL(imageFile);
    }
  };

  const openCamera = async () => {
    setActiveCamera((state) => !state);
    try {
      //get users camera if available
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      //if a ref has a node currently set, give it the camera stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
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

      setImageToUpload(imageFileFromBlob);
      //once image is captured set preview and close camera
      setImagePreview(dataUrl);
      setActiveCamera(false);
    }
  };

  return (
    <div
      key={url}
      className="">
      <div className="flex flex-col  max-w-[500px] ">
        <div className="  w-full flex flex-col justify-center items-center ">
          {imagePreview && !activeCamera ? (
            <img
              className="w-full "
              src={imagePreview.toString()}
              alt="Preview"
            />
          ) : null}

          {activeCamera && (
            <section className=" w-full flex flex-col border-solid h-full border-8 ">
              <div className="h-3/4">
                <CameraPreview videoRef={videoRef} />
              </div>

              <div
                className="btn h-1/4"
                onClick={captureFrame}>
                capture
              </div>
            </section>
          )}
          <section className="p-3">
            <h4 className="">
              Update link manually or use the edit tools to upload new image
            </h4>

            <textarea
              onChange={(event) => {
                const text = event.target.value;
                setUrl(text);
              }}
              wrap="true"
              defaultValue={url}
              cols={40}
            />
          </section>
        </div>

        <label
          htmlFor=""
          className="text-black border-2 border-s-violet-100">
          <h3 className=" bg-gray-700">Edit Tools</h3>

          <div
            className="btn"
            onClick={openCamera}>
            Use camera
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div
            onClick={() => {
              handleImageUpload("testfolder");
            }}
            className="btn">
            Upload Image
          </div>
        </label>
      </div>
    </div>
  );
}
