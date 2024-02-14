import { ProcedureT } from "../../hooks/useGetLatest";

export default function ProcedureList({
  list,
}: {
  list: ProcedureT[];
}): React.ReactNode {
  const cards = list.map((proc) => {
    return ProcedureCard(proc);
  });
  return (
    <div>
      <ul>{cards}</ul>
    </div>
  );
}

function ProcedureCard(proc: ProcedureT) {
  const images = proc.images.map((url) => {
    return (
      <li
        key={url}
        className="carousel-item w-3/4">
        <img
          src={url}
          className="rounded-box"
        />
      </li>
    );
  });
  return (
    <li>
      <ul className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box">
        {images}
      </ul>
      <section className="">
        <h3 className="text-lg text-gray">Instructions: </h3>
        <p className="p-4 text-center text-gray">{proc.instructions}</p>
      </section>
    </li>
  );
}
