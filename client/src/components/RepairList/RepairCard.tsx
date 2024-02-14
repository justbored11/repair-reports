import { repairDataT } from "../../hooks/useGetLatest";
import { Link } from "react-router-dom";
import noImagePlaceholder from "../../assets/no-image.png";

export const RepairCard = ({
  data,
}: {
  data: repairDataT;
}): React.ReactNode => {
  console.log("data", data);

  const previewImageUrl =
    data.procedureArr.length > 0 && data?.procedureArr[0]?.images[0]
      ? data.procedureArr[0]?.images[0]
      : noImagePlaceholder;

  return (
    // <div
    //   className=""
    //   data-test="entry">
    //   {/* <Link className=" " href="/repair/<%= repairs[i]._id%>"> */}
    //   <Link
    //     state={data}
    //     to={`/repair/${data._id}`}
    //     className="">
    //     <div className=" h-full card shadow-xl image-full hover:opacity-80 hover:bg-green-400">
    //       <figure>
    //         <img
    //           loading="lazy"
    //           src={previewImageUrl}
    //           alt="repair preview image"
    //         />
    //       </figure>
    //       <div className="card-body">
    //         <h2 className="card-title">{data.title}</h2>
    //         <p>
    //           {data.procedureArr.length > 0 &&
    //             data.procedureArr[0]?.instructions}
    //         </p>
    //       </div>
    //     </div>
    //   </Link>
    // </div>
    <Link
      state={data}
      to={`/repair/${data._id}`}
      className="">
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
