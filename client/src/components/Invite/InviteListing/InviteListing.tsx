export interface InviteT {
  inviteCode: string;
  invitePassword: string;
  groups: { id: string; name: string }[];
  createdAt: string;
  status: string;
}

export function InviteListing({ invite }: { invite?: InviteT }) {
  return (
    <tr>
      <td className="text-center">{invite?.status || ""}</td>
      <td className="text-center">{invite?.inviteCode || ""}</td>
      <td className="text-center">{invite?.invitePassword || ""}</td>
      <td className="text-center">
        <ul>
          {invite?.groups
            ? invite?.groups.map((g) => (
                <li key={g.id}>
                  {g.id}:{g.name}
                </li>
              ))
            : ""}
        </ul>
      </td>
    </tr>
  );
}
