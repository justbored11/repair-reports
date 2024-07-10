type userInfoProps = { email?: string; username?: string };

export default function UserInforUpdateForm({
  email,
  username,
}: userInfoProps) {
  return (
    <section>
      <form action="">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </form>

      <form>
        <section>
          <h3>Change password</h3>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Current Password</span>
            </div>
            <input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <div className="flex">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">New Password</span>
              </div>
              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Confirm new password</span>
              </div>
              <input
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm new password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </section>
      </form>
    </section>
  );
}
