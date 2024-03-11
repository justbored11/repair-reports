import React from "react";

export function CameraPreview({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  return (
    <video
      className="h-full w-full"
      ref={videoRef}
      style={{ display: "block", maxWidth: "100%" }}
      autoPlay
    />
  );
}
