import { InviteListing } from "./InviteListing/InviteListing";

export type InviteT = {
  inviteCode: string;
  invitePassword: string;
  groups: { id: string; name: string }[];
  createdAt: string;
  status: string;
};

const testInvites = [
  {
    inviteCode: "string",
    invitePassword: "string",
    groups: [
      { id: "1234", name: "cool group" },
      { id: "1234533", name: "another group" },
    ],

    createdAt: "string",
    status: "pending",
  },
];

type InviteLogProps = {
  invites?: InviteT[];
};

export default function InviteLog({ invites = testInvites }: InviteLogProps) {
  return (
    <div>
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
    </div>
  );
}
