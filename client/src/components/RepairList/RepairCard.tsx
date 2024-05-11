import { useState } from "react";
import noImagePlaceholder from "../../assets/no-image.png";

export const RepairCard = ({
  previewUrl = noImagePlaceholder,
  summary,
  title,
}: {
  previewUrl?: string;
  title?: string;
  summary?: string;
}): React.ReactNode => {
  // console.log("data", data);

  const [previewImageUrl, setPreviewUrl] = useState(previewUrl);

  return (
    <div className="w-full">
      <div
        data-test="entry"
        className="card bg-base-100 shadow-xl image-full">
        <figure className="">
          <img
            className=""
            src={previewImageUrl}
            onError={() => {
              setPreviewUrl(noImagePlaceholder);
            }}
          />
        </figure>
        <div className="card-body w-full">
          {title && <h2 className="card-title">{title}</h2>}
          {summary && <p>{summary}</p>}
        </div>
      </div>
    </div>
  );
};
