export default function UserStats() {
  return (
    <div className="flex flex-col">
      <div className="self-center">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-[300px] rounded-full">
            <span className="text-[100px]">D</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <section className="flex gap-1">
          <button className="btn ">
            <div>
              <span className="block">Total Repairs</span>
              <div className="badge">99</div>
            </div>
          </button>
          <button className="btn ">
            <div>
              <span className="block">Joined Groups</span>
              <div className="badge">99</div>
            </div>
          </button>
        </section>
      </div>
    </div>
  );
}
