type InviteT = {
  inviteCode: string;
  invitePassword: string;
  groupsId: string[];
  createdAt: string;
  status: string;
};

type InviteToolPropsT = {
  invites?: InviteT[];
};

const testInvites = [
  {
    inviteCode: "string",
    invitePassword: "string",
    groupsId: ["1234", "1234533"],
    createdAt: "string",
    status: "pending",
  },
];

export default function InviteTool({
  invites = testInvites,
}: InviteToolPropsT) {
  return (
    <section className="relative">
      <div className="flex justify-between">
        <span>Invite History</span>
        <div className="btn btn-sm ">
          <span>create invite +</span>
        </div>
      </div>
      <table className=" w-full">
        <section className=""></section>

        <tr>
          <th>Status</th>
          <th>Invite Code</th>
          <th>Invite Password</th>
          <th>Groups</th>
        </tr>
        {invites.map((inv) => {
          return <InviteListing invite={inv} />;
        })}
      </table>
    </section>
  );
}

function InviteListing({ invite }: { invite: InviteT }) {
  return (
    <tr>
      <td className="text-center">{invite.status}</td>
      <td className="text-center">{invite.inviteCode}</td>
      <td className="text-center">{invite.invitePassword}</td>
      <td className="text-center">
        <ul>
          {invite.groupsId.map((id) => (
            <li>{id}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}
