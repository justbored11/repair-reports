import { render, screen } from "@testing-library/react";

import { CameraPreview } from "../../src/components/ImageCard/CameraPreview";
import { createRef } from "react";

describe("CameraPreview ", () => {
  it("should no crash on render", () => {
    const videoRef = createRef<HTMLVideoElement>();
    render(<CameraPreview videoRef={videoRef} />);

    // Check if the videoRef.current points to the video element
    expect(videoRef.current).toBeInstanceOf(HTMLVideoElement);
  });
  it("should no crash on render", () => {
    render(<CameraPreview />);

    const component = screen.getByTestId("camera-preview");

    // Check if the videoRef.current points to the video element
    expect(component).toBeInTheDocument();
  });
});
