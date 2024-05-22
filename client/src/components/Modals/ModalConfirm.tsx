import React from "react";

import { v4 as uuidv4 } from "uuid";

type modalConfirmProps = {
  children: React.ReactNode;
  label: string;
};

const ModalConfirm = ({ children, label }: modalConfirmProps) => {
  return (
    <section>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <div
        className="btn"
        onClick={() => {
          //@ts-expect-error document exists
          document.getElementById("modal" + label).showModal();
        }}>
        {label}
      </div>
      <dialog
        id={"modal" + label}
        className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* component to display */}
          <section>{children}</section>
        </div>
      </dialog>
    </section>
  );
};

export default ModalConfirm;
