import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LoginCard(): React.ReactNode {
  const { login, signUp } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    inviteCode: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <div className="flex justify-center ">
      <div className=" flex justify-center w-5/6">
        <div className="bg-slate-500 p-1 h-full flex flex-col gap-1 w-full">
          <div
            onClick={() => {
              setIsLogin((state) => {
                setFormData({
                  username: "",
                  email: "",
                  confirmEmail: "",
                  password: "",
                  confirmPassword: "",
                  inviteCode: "",
                });
                return !state;
              });
            }}
            className={
              "btn-xs btn w-48 " + (isLogin ? "bg-blue-700" : "bg-green-600")
            }>
            {isLogin ? "signup here" : "Login here"}
          </div>

          <h3 className={"font-bold text-lg text-center"}>
            {isLogin ? "Please Login" : "Please Signup"}
          </h3>

          <div className="flex flex-col align-middle justify-center items-center gap-2">
            {!isLogin && (
              <label className="max-w-xs flex flex-col">
                <div className="label">
                  <span className="label-text">Username: </span>
                </div>
                <input
                  value={formData.username}
                  onChange={(event) => {
                    setFormData((state) => {
                      return { ...state, username: event.target.value };
                    });
                  }}
                  type="text"
                  placeholder="Username"
                  className="input input-bordered "
                />
              </label>
            )}
            <label className="max-w-xs  flex flex-col justify-center">
              <div className="label">
                <span className="label-text">Email: </span>
              </div>
              <input
                value={formData.email}
                onChange={(event) => {
                  setFormData((state) => {
                    return { ...state, email: event.target.value };
                  });
                }}
                type="text"
                placeholder="Email"
                className="input input-bordered "
              />
            </label>

            {!isLogin && (
              <label className="max-w-xs  flex flex-col justify-center">
                <div className="label">
                  <span className="label-text">Confirm Email: </span>
                </div>
                <input
                  value={formData.confirmEmail}
                  onChange={(event) => {
                    setFormData((state) => {
                      if (event.target.value == formData.email) {
                        setValidEmail(true);
                      } else {
                        setValidEmail(false);
                      }
                      return { ...state, confirmEmail: event.target.value };
                    });
                    //todo check matching data with other feild
                  }}
                  type="text"
                  placeholder="Confirm Email"
                  className="input input-bordered "
                />
              </label>
            )}
            <label className="max-w-xs flex flex-col">
              <div className="label">
                <span className="label-text">Password:</span>
              </div>
              <input
                value={formData.password}
                onChange={(event) => {
                  setFormData((state) => {
                    return { ...state, password: event.target.value };
                  });
                }}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            {!isLogin && (
              <label className="max-w-xs flex flex-col">
                <div className="label">
                  <span className="label-text">Confirm Password:</span>
                </div>
                <input
                  onChange={(event) => {
                    setFormData((state) => {
                      if (event.target.value == formData.password) {
                        setValidPassword(true);
                      } else {
                        setValidPassword(false);
                      }
                      return { ...state, confirmPassword: event.target.value };
                    });
                    console.log(formData.password, formData.confirmPassword);
                  }}
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            )}

            {/* invite code section */}
            {!isLogin && (
              <label className="max-w-xs flex flex-col">
                <div className="label">
                  <span className="label-text">Invite Code:</span>
                </div>
                <input
                  onChange={(event) => {
                    setFormData((state) => {
                      return { ...state, inviteCode: event.target.value };
                    });
                  }}
                  type="text"
                  placeholder="Invite Code"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            )}
          </div>

          {/* Login button / signup button */}
          <div className="flex flex-row-reverse">
            <div
              onClick={() => {
                //todo validate form
                if (isLogin) {
                  login!(formData.email, formData.password);
                }
                if (!isLogin) {
                  if (signUp) {
                    const { email, password, username, inviteCode } = formData;
                    signUp({ email, password, username, inviteCode });
                  }
                }
              }}
              className={
                "btn " +
                ((validPassword && validEmail) || isLogin ? "" : "btn-disabled")
              }>
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
