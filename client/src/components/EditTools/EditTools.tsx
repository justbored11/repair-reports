import { NavLink } from "react-router-dom";
import { repairDataT } from "../../hooks/useGetLatest";
type editToolsPropsT = {
  editPageUrl: string;
  data: repairDataT;
};

export default function EditTools({
  editPageUrl,
  data,
}: editToolsPropsT): React.ReactNode {
  return (
    <section>
      <h3>EditTools</h3>

      <section>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => {
            //@ts-expect-error document exists
            document.getElementById("my_modal_3").showModal();
          }}>
          Edit Repair
        </button>
        <dialog
          id="my_modal_3"
          className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Confirm you wanna edit</h3>

            <div className="btn">
              <NavLink
                state={data}
                to={editPageUrl}>
                Edit Repair
              </NavLink>
            </div>
          </div>
        </dialog>
      </section>
    </section>
  );
}
