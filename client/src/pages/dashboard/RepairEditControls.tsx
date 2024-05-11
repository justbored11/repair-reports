import { ControlOption } from "./UsersRepairs";

export function RepairEditControls({
  controls,
}: {
  controls: ControlOption[];
}) {
  const buttons = controls.map((control: ControlOption) => {
    return (
      <li>
        <a
          className="btn w-full hover:bg-slate-600"
          onClick={() => {
            control.action();
          }}>
          {control.name}
        </a>
      </li>
    );
  });

  return <ul className="z-1 flex flex-col gap-2">{buttons}</ul>;
}
