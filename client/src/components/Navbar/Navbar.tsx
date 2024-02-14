import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import Search from "./Search";

export default function Navbar(): React.ReactNode {
  const { logout } = useAuthContext();
  return (
    <>
      <div className="navbar bg-base-100 gap-3">
        <div className="flex-1">
          <div>
            <a className="btn btn-ghost text-xl">Circuit Chaser</a>
          </div>
        </div>

        <ul className=" flex menu menu-horizontal gap-1">
          <li>
            <Link to={"/dashboard"}>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <span>Latest Reports</span>
            </Link>
          </li>
          <li>
            <Link to={"/repairform"}>
              <span>Create Report</span>
            </Link>
          </li>
          <li className="form-control">
            {/* <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            /> */}
            <Search></Search>
          </li>

          <li className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="USERIMAGE"
                  src="#"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link to={"/profile"}>
                  <span className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"#"}>Settings</Link>
              </li>
              <li>
                <Link
                  onClick={() => logout && logout()}
                  to={"#"}>
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
