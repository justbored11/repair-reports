import { repairDataT } from "../../../types";
import { Link } from "react-router-dom";
import noImagePlaceholder from "../../assets/no-image.png";

export const RepairCard = ({
  data,
}: {
  data: repairDataT;
}): React.ReactNode => {
  // console.log("data", data);

  const previewImageUrl =
    data.procedureArr.length > 0 && data?.procedureArr[0]?.images[0]
      ? data.procedureArr[0]?.images[0]
      : noImagePlaceholder;

  return (
    <Link
      state={{ repair: data }}
      to={`/repair/${data._id}`}
      className="w-full">
      <div
        data-test="entry"
        className="card h-full w-full bg-base-100 shadow-xl image-full">
        <figure>
          <img src={previewImageUrl} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.title}</h2>
          <p>
            {data.procedureArr.length > 0 && data.procedureArr[0]?.instructions}
          </p>
        </div>
      </div>
    </Link>
  );
};
